(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mouseEnabled = false;

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function on(element, event, handler, options) {
    if (element) element.addEventListener(event, handler, options);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function safeUrl(value) {
    if (typeof value !== 'string') return '';
    var trimmed = value.trim();
    if (!trimmed) return '';
    if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
    if (trimmed.indexOf('#') === 0 || trimmed.indexOf('assets/') === 0) return trimmed;
    return '';
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function icon(id, size) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('width', String(size || 18));
    svg.setAttribute('height', String(size || 18));
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#' + id);
    svg.appendChild(use);
    return svg;
  }

  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS.slice() : [];

  /* ---------- Reveal ---------- */
  function setupReveal() {
    var targets = $$('.reveal, .reveal-stagger');
    if (!('IntersectionObserver' in window) || reducedMotion.matches) {
      targets.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (node) { observer.observe(node); });
  }

  /* ---------- Counters ---------- */
  function setupCounters() {
    var counters = $$('.stat__num');
    if (!counters.length) return;
    var started = false;

    function format(value, decimals) {
      var text = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
      return text.replace('.', ',');
    }

    function run() {
      if (started) return;
      started = true;
      counters.forEach(function (node) {
        var target = Number(node.getAttribute('data-count') || node.textContent.replace(',', '.')) || 0;
        var decimals = Number(node.getAttribute('data-decimals') || 0) || 0;
        if (reducedMotion.matches) {
          node.textContent = format(target, decimals);
          return;
        }
        var duration = 1300;
        var start = performance.now();
        function tick(now) {
          var progress = clamp((now - start) / duration, 0, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = format(target * eased, decimals);
          if (progress < 1) requestAnimationFrame(tick);
          else node.textContent = format(target, decimals);
        }
        requestAnimationFrame(tick);
      });
    }

    if (!('IntersectionObserver' in window)) {
      run();
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run();
        observer.disconnect();
      });
    }, { threshold: 0.4 });
    var stats = $('.stats');
    if (stats) observer.observe(stats);
    else run();
  }

  /* ---------- Header / progress / cursor / tilt ---------- */
  function setupScrollEffects() {
    var header = $('#site-header');
    var progress = $('#scroll-progress');
    var ticking = false;

    function update() {
      var scrollTop = window.pageYOffset || root.scrollTop || 0;
      var height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (header) header.classList.toggle('is-scrolled', scrollTop > 16);
      if (progress) progress.style.setProperty('--progress', String(clamp(scrollTop / height, 0, 1)));
      ticking = false;
    }

    on(window, 'scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function setupTilt() {
    $$('[data-tilt]').forEach(function (node) {
      if (node.dataset.tiltReady === '1') return;
      node.dataset.tiltReady = '1';
      var raf = 0;
      var rx = 0;
      var ry = 0;
      var mx = 50;
      var my = 50;
      function apply() {
        node.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        node.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        node.style.setProperty('--mx', mx.toFixed(1) + '%');
        node.style.setProperty('--my', my.toFixed(1) + '%');
        raf = 0;
      }
      on(node, 'pointermove', function (event) {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        var rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        var px = (event.clientX - rect.left) / rect.width;
        var py = (event.clientY - rect.top) / rect.height;
        rx = (0.5 - py) * 7;
        ry = (px - 0.5) * 7;
        mx = px * 100;
        my = py * 100;
        if (!raf) raf = requestAnimationFrame(apply);
      }, { passive: true });
      on(node, 'pointerleave', function () {
        rx = 0;
        ry = 0;
        mx = 50;
        my = 50;
        if (!raf) raf = requestAnimationFrame(apply);
      });
    });
  }

  /* Световой след и tilt включаются по факту события мыши: медиа-запрос (hover/pointer)
     может врать (тач-экран как основное устройство ввода) и глушит эффекты. */
  function setupPointerEffects() {
    var glow = $('#cursor-glow');
    var raf = 0;
    var x = 0;
    var y = 0;

    function moveGlow() {
      if (glow) glow.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      raf = 0;
    }

    function enableMouse() {
      if (mouseEnabled) return;
      mouseEnabled = true;
      root.classList.add('has-mouse');
      setupTilt();
    }

    on(document, 'pointermove', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      enableMouse();
      if (reducedMotion.matches) return;
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(moveGlow);
    }, { passive: true });

    on(document, 'pointerdown', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      enableMouse();
    }, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  function setupMobileNav() {
    var toggle = $('#nav-toggle');
    var nav = $('#mobile-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      nav.classList.toggle('is-open', open);
      body.classList.toggle('nav-open', open);
      if (open) {
        var first = $('a, button', nav);
        if (first) first.focus({ preventScroll: true });
      }
    }

    function close() { setOpen(false); }

    on(toggle, 'click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    $$('[data-nav-link]', nav).forEach(function (link) { on(link, 'click', close); });
    on(nav, 'click', function (event) {
      if (event.target === nav) close();
    });
    on(document, 'keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });
    on(window, 'resize', function () {
      if (window.innerWidth >= 900 && toggle.getAttribute('aria-expanded') === 'true') close();
    });
  }

  /* ---------- Active nav ---------- */
  function setupActiveNav() {
    var links = $$('[data-nav-link]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var sections = $$('#about, #services, #projects, #contact');
    if (!sections.length) return;
    var map = {};
    links.forEach(function (link) {
      var id = (link.getAttribute('href') || '').replace('#', '');
      if (id) map[id] = link;
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = map[entry.target.id];
        if (!link) return;
        links.forEach(function (item) {
          item.classList.remove('is-active');
          item.removeAttribute('aria-current');
        });
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- Projects: render, filters, carousel, modal ---------- */
  var state = {
    filter: 'all',
    index: 0,
    cols: 1,
    step: 0,
    cardCount: 0,
    visibleCount: 1,
    lastFocus: null,
    modalProject: null,
    drag: null,
    suppressClickUntil: 0
  };

  var track = $('#project-track');
  var viewport = $('#project-viewport');
  var dots = $('#project-dots');
  var prevButton = $('#prev-project');
  var nextButton = $('#next-project');
  var modal = $('#project-modal');
  var modalPanel = modal ? $('.modal__panel', modal) : null;
  var modalClose = $('#modal-close');

  function filteredProjects() {
    if (state.filter === 'all') return projects;
    return projects.filter(function (project) { return project.category === state.filter; });
  }

  function categoryLabel(project) {
    if (project.categoryLabel) return project.categoryLabel;
    var map = { web: 'Web', bots: 'Боты', apps: 'Приложения', engineering: 'Инженерия' };
    return map[project.category] || project.category || 'Проект';
  }

  function makeCard(project, index) {
    var card = el('article', 'project-card');
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('data-category', project.category || '');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Открыть проект: ' + project.title);

    var cover = el('div', 'project-card__cover');
    if (project.cover) {
      var img = el('img');
      img.src = project.cover;
      img.alt = project.title;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      img.addEventListener('error', function () {
        img.remove();
        cover.appendChild(makePlaceholder(project, index));
      });
      cover.appendChild(img);
    } else {
      cover.appendChild(makePlaceholder(project, index));
    }

    var cardBody = el('div', 'project-card__body');
    var meta = el('div', 'project-card__meta');
    meta.appendChild(el('span', 'project-card__category', categoryLabel(project)));
    var right = el('span', 'project-card__year', project.year || '');
    meta.appendChild(right);

    var title = el('h3', 'project-card__title', project.title);
    var subtitle = el('p', 'project-card__subtitle', project.subtitle || '');
    var text = el('p', 'project-card__text', project.description || '');
    var tags = el('ul', 'tags');
    (project.tags || []).slice(0, 4).forEach(function (tag) {
      tags.appendChild(el('li', 'tag', tag));
    });
    var more = el('span', 'project-card__more');
    more.appendChild(document.createTextNode('Подробнее'));
    more.appendChild(icon('i-arrow-right', 16));

    cardBody.appendChild(meta);
    cardBody.appendChild(title);
    if (project.subtitle) cardBody.appendChild(subtitle);
    cardBody.appendChild(text);
    cardBody.appendChild(tags);
    cardBody.appendChild(more);

    card.appendChild(cover);
    card.appendChild(cardBody);

    card.addEventListener('click', function (event) {
      if (Date.now() < state.suppressClickUntil) return;
      if (event.target.closest('a')) return;
      openProject(project, card, true);
    });
    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(project, card, true);
      }
    });

    return card;
  }

  function makePlaceholder(project, index) {
    var placeholder = el('div', 'project-card__placeholder', String(index + 1).padStart(2, '0'));
    placeholder.setAttribute('aria-hidden', 'true');
    return placeholder;
  }

  function renderProjects() {
    if (!track) return;
    var items = filteredProjects();
    track.textContent = '';
    state.cardCount = items.length;
    items.forEach(function (project, index) {
      track.appendChild(makeCard(project, index));
    });
    state.index = 0;
    measure();
  }

  function measure() {
    if (!track || !viewport) return;
    var colsValue = getComputedStyle(root).getPropertyValue('--cols');
    var cols = parseInt(colsValue, 10);
    if (!cols || cols < 1) cols = 1;
    state.cols = cols;
    var card = track.querySelector('.project-card');
    if (!card) {
      state.step = 0;
      state.visibleCount = cols;
      updateCarousel();
      return;
    }
    var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
    state.step = card.getBoundingClientRect().width + gap;
    state.visibleCount = Math.max(1, Math.round((viewport.clientWidth + gap) / (state.step || 1)));
    state.visibleCount = Math.min(state.visibleCount, cols);
    state.index = clamp(state.index, 0, maxIndex());
    updateCarousel();
  }

  function maxIndex() {
    return Math.max(0, state.cardCount - state.visibleCount);
  }

  function updateCarousel() {
    if (!track) return;
    track.style.transform = 'translate3d(' + (-state.index * state.step) + 'px,0,0)';
    var max = maxIndex();
    if (prevButton) prevButton.disabled = state.index <= 0;
    if (nextButton) nextButton.disabled = state.index >= max;
    if (dots) {
      dots.textContent = '';
      if (max <= 0) {
        dots.style.display = 'none';
      } else {
        dots.style.display = '';
        for (var i = 0; i <= max; i += 1) {
          var dot = el('button', 'carousel__dot' + (i === state.index ? ' is-active' : ''));
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Позиция ' + (i + 1) + ' из ' + (max + 1));
          if (i === state.index) dot.setAttribute('aria-current', 'true');
          (function (position) {
            dot.addEventListener('click', function () {
              state.index = position;
              updateCarousel();
            });
          })(i);
          dots.appendChild(dot);
        }
      }
    }
    if (track.parentElement) {
      track.parentElement.setAttribute('aria-live', 'polite');
    }
  }

  function go(delta) {
    state.index = clamp(state.index + delta, 0, maxIndex());
    updateCarousel();
  }

  function setupCarousel() {
    if (!track || !viewport) return;
    on(prevButton, 'click', function () { go(-1); });
    on(nextButton, 'click', function () { go(1); });

    on(viewport, 'keydown', function (event) {
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); go(1); }
    });

    var startX = 0;
    var startY = 0;
    var deltaX = 0;
    var activePointer = null;

    on(viewport, 'pointerdown', function (event) {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      activePointer = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      deltaX = 0;
      state.drag = { startX: startX, startY: startY, horizontal: false };
      viewport.classList.add('is-dragging');
      if (viewport.setPointerCapture) viewport.setPointerCapture(activePointer);
    });

    on(viewport, 'pointermove', function (event) {
      if (!state.drag || event.pointerId !== activePointer) return;
      var dx = event.clientX - state.drag.startX;
      var dy = event.clientY - state.drag.startY;
      if (!state.drag.horizontal) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          state.drag = null;
          viewport.classList.remove('is-dragging');
          return;
        }
        state.drag.horizontal = true;
      }
      deltaX = dx;
      track.style.transform = 'translate3d(' + (-state.index * state.step + dx) + 'px,0,0)';
    });

    function finish(event) {
      if (!state.drag || (activePointer !== null && event.pointerId !== activePointer)) return;
      var horizontal = state.drag.horizontal;
      var dx = deltaX;
      state.drag = null;
      activePointer = null;
      viewport.classList.remove('is-dragging');
      if (!horizontal) {
        updateCarousel();
        return;
      }
      if (Math.abs(dx) > Math.min(80, state.step * 0.18)) {
        go(dx < 0 ? 1 : -1);
        state.suppressClickUntil = Date.now() + 320;
      } else {
        updateCarousel();
      }
    }

    on(viewport, 'pointerup', finish);
    on(viewport, 'pointercancel', finish);

    if ('ResizeObserver' in window) {
      var resizeObserver = new ResizeObserver(function () { measure(); });
      resizeObserver.observe(viewport);
    }
    on(window, 'resize', measure);

    var filterBar = $('#project-filters');
    if (filterBar) {
      $$('.chip', filterBar).forEach(function (chip) {
        on(chip, 'click', function () {
          state.filter = chip.getAttribute('data-filter') || 'all';
          $$('.chip', filterBar).forEach(function (item) {
            item.setAttribute('aria-pressed', item === chip ? 'true' : 'false');
            item.classList.toggle('is-active', item === chip);
          });
          renderProjects();
        });
      });
    }
  }

  /* ---------- Modal ---------- */
  function fillModal(project) {
    if (!modal) return;
    var cover = $('#modal-cover');
    var img = cover ? $('img', cover) : null;
    if (img) {
      if (project.cover) {
        img.src = project.cover;
        img.alt = project.title;
        img.style.display = '';
      } else {
        img.removeAttribute('src');
        img.alt = '';
        img.style.display = 'none';
      }
    }
    var category = $('#modal-category');
    var year = $('#modal-year');
    var title = $('#modal-title');
    var tags = $('#modal-tags');
    var description = $('#modal-description');
    var link = $('#modal-link');
    var actions = link ? link.parentElement : null;

    if (category) category.textContent = categoryLabel(project);
    if (year) year.textContent = project.year || '';
    if (title) title.textContent = project.title;
    if (description) description.textContent = project.details || project.description || '';
    if (tags) {
      tags.textContent = '';
      (project.tags || []).forEach(function (tag) { tags.appendChild(el('span', 'tag', tag)); });
    }
    if (link) {
      var url = safeUrl(project.link);
      if (url) {
        link.href = url;
        link.style.display = '';
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      } else {
        link.removeAttribute('href');
        link.style.display = 'none';
      }
    }
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    body.classList.add('modal-open');
    state.modalProject = project;
    state.lastFocus = document.activeElement;
    if (modalClose) modalClose.focus({ preventScroll: true });
  }

  function openProject(project, trigger, updateHash) {
    if (!modal || !project) return;
    fillModal(project);
    if (trigger) state.lastFocus = trigger;
    if (updateHash) {
      try { history.pushState({ project: project.id }, '', '#project/' + project.id); } catch (error) { /* file:// */ }
    }
  }

  function closeModal(updateHash) {
    if (!modal || modal.getAttribute('aria-hidden') === 'true') return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open');
    body.classList.remove('modal-open');
    state.modalProject = null;
    if (updateHash) {
      try { history.replaceState(null, '', '#projects'); } catch (error) { /* file:// */ }
    }
    var focusTarget = state.lastFocus;
    state.lastFocus = null;
    if (focusTarget && typeof focusTarget.focus === 'function') focusTarget.focus({ preventScroll: true });
  }

  function projectFromHash() {
    var hash = window.location.hash.replace(/^#/, '');
    if (hash.indexOf('project/') !== 0) return null;
    var id = decodeURIComponent(hash.slice('project/'.length));
    for (var i = 0; i < projects.length; i += 1) {
      if (projects[i].id === id) return projects[i];
    }
    return null;
  }

  function syncFromHash() {
    var project = projectFromHash();
    if (project) {
      if (!state.modalProject || state.modalProject.id !== project.id) openProject(project, null, false);
    } else if (state.modalProject) {
      closeModal(false);
    }
  }

  function setupModal() {
    if (!modal) return;
    on(modalClose, 'click', function () { closeModal(true); });
    $$('[data-modal-close]', modal).forEach(function (node) {
      on(node, 'click', function () { closeModal(true); });
    });
    on(modal, 'click', function (event) {
      if (event.target === modal || event.target.classList.contains('modal__backdrop')) closeModal(true);
    });
    on(document, 'keydown', function (event) {
      if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal(true);
      }
      if (event.key !== 'Tab' || modal.getAttribute('aria-hidden') !== 'false' || !modalPanel) return;
      var focusable = $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', modalPanel).filter(function (node) {
        return node.offsetWidth > 0 || node.offsetHeight > 0;
      });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    on(window, 'popstate', syncFromHash);
    on(window, 'hashchange', syncFromHash);
    syncFromHash();
  }

  /* ---------- Copy email ---------- */
  function setupCopyEmail() {
    var button = $('#copy-email');
    var toast = $('#contact-toast');
    if (!button) return;
    var email = button.getAttribute('data-copy') || 'psihologgg@mail.ru';
    var timer = 0;

    function show(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('is-visible');
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 2400);
    }

    function fallbackCopy() {
      var area = document.createElement('textarea');
      area.value = email;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-1000px';
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (error) { ok = false; }
      document.body.removeChild(area);
      return ok;
    }

    on(button, 'click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          show('Email скопирован');
        }).catch(function () {
          show(fallbackCopy() ? 'Email скопирован' : 'Email: ' + email);
        });
      } else {
        show(fallbackCopy() ? 'Email скопирован' : 'Email: ' + email);
      }
    });
  }

  /* ---------- Init ---------- */
  function init() {
    if (projects.length) {
      renderProjects();
      setupCarousel();
      setupModal();
    }
    setupReveal();
    setupCounters();
    setupScrollEffects();
    setupPointerEffects();
    setupMobileNav();
    setupActiveNav();
    setupCopyEmail();
    var year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
