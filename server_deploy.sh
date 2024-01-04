
#!/bin/sh
set -e

echo "Deploying application ..."

pm2 stop dua

git pull --rebase origin dev

pm2 start dua

echo "Application deployed!"
