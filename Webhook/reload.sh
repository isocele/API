cd /home/back/API
docker-compose down
git pull origin master
docker-compose build && docker-compose up