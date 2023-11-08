# Makefile

install_laravel:
	cd ./laravel
	 cp ./.env.example ./.env && \
	 sudo apt-get install php8.1-mysql php8.1-xml php8.1-gd php8.1-curl php8.1-zip php8.1-mysql && \
	 composer install && \
	 composer update && \
	 php artisan key:generate

install_react:
	cd ./react && \
	 cp ./.env.example ./.env && \
	 npm install 

laravel_migrations:
	cd ./laravel && \
	 php artisan make:migration init && \
	 php artisan migrate && \
	 php artisan migrate:status

laravel_seed_db:
	cd ./laravel && php artisan migrate:fresh --seed

laravel_start:
	cd ./laravel && php artisan serve

react_start:
	cd ./react && npm start

xampp_start:
	sudo /opt/lampp/xampp start

start_project:
	make laravel_start
	make react_start

start_all:
	echo "Start all: "
	make start_project
	make xampp_start