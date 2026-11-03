#!/data/data/com.termux/files/usr/bin/sh
export PREFIX=/data/data/com.termux/files/usr
export PATH=$PREFIX/bin:$PATH
export TMPDIR=$PREFIX/tmp
mkdir -p $TMPDIR

termux-wake-lock >/dev/null 2>&1 || true

sshd >/dev/null 2>&1 || $PREFIX/bin/sshd >/dev/null 2>&1 || true

nginx -c /data/data/com.termux/files/home/nginx.conf >/dev/null 2>&1 || true

while true; do
  pgrep -x sshd >/dev/null 2>&1 || sshd >/dev/null 2>&1 || true
  pgrep -f "nginx: master" >/dev/null 2>&1 || nginx -c /data/data/com.termux/files/home/nginx.conf >/dev/null 2>&1 || true
  sleep 120
done
