#!/bin/sh

docker rm -v najs-eloquent-mariadb
docker run -p "3306:3306" -e MYSQL_ALLOW_EMPTY_PASSWORD=1 --name najs-eloquent-mariadb -d mariadb
