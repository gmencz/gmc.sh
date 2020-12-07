#!/bin/sh
if [ $(docker ps -f name=blue-gmc-sh -q) ]
then
    BG_NEW="green-gmc-sh"
    BG_OLD="blue-gmc-sh"
else
    BG_NEW="blue-gmc-sh"
    BG_OLD="green-gmc-sh"
fi

echo "Pulling latest images from Github Package Registry"
sudo docker-compose -f docker-compose.prod-apps.yml --project-name=$BG_NEW pull core-api next-app next-app-reverse-proxy
sleep 2s
echo "Starting "$BG_NEW" containers"
sudo docker-compose -f docker-compose.prod-apps.yml --project-name=$BG_NEW pull up -d --force-recreate --build core-api next-app next-app-reverse-proxy

echo "Waiting..."
sleep 60s

echo "Stopping "$BG_OLD" containers"
sudo docker-compose -f docker-compose.prod-apps.yml --project-name=$BG_OLD stop