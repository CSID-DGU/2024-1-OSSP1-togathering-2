# local 환경에서 docker-compose build
docker-compose -f docker-compose-dev.yml up -d

# local 환경에서 docker-compose down
docker-compose -f docker-compose-dev.yml down

# prod 환경에서 docker-compose build
docker-compose -f docker-compose-prod.yml up -d

# prod 환경에서 docker-compose down
docker-compose -f docker-compose-prod.yml down

# 터미널에서 mysql 접속 (GUI로 해도 됨.)
docker exec -it 2024-1-ossp1-togathering-2-db-1 bash
mysql -u root -p
