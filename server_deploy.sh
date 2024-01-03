
#!/bin/sh
set -e

echo "Deploying application ..."

pm2 stop oke

git pull --rebase origin dev

pm2 start oke

echo "Application deployed!"
