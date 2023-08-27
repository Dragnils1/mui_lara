########################################################################
### Composer

FROM composer:2.5.8 AS composer

COPY composer.json /app
COPY composer.lock /app

#apt install shold be ended early
RUN sleep 15 


RUN composer install        \
    --ignore-platform-reqs  \
    --no-ansi               \
    --no-interaction        \
    --no-scripts
    # && composer update -W

COPY . /app/
RUN composer dump-autoload --optimize --classmap-authoritative

### Composer
########################################################################
### NodeJS

FROM node:20-alpine3.17 AS node

WORKDIR /app

COPY package.json           /app
# COPY /public                /app/public
# COPY package-lock.json      /app
COPY vite.config.js         /app
COPY /resources             /app/resources

# RUN npm install && npm run dev

### NodeJS
########################################################################
### PHP

FROM php:8.2-fpm-alpine


RUN apk update && apk add --no-cache \
    oniguruma-dev                    \
    libzip-dev                       \
    libpng-dev                       \
    freetype-dev                     \
    libjpeg-turbo-dev                \
    libxml2-dev

RUN rm -rf /var/lib/apt/lists/* && rm -rf /var/cache/apk/*
RUN docker-php-ext-configure gd --enable-gd --with-freetype
RUN docker-php-ext-install zip pdo_mysql mbstring exif pcntl bcmath gd 

COPY --chown=www:www-data --from=composer /app/vendor         /var/www/vendor 
# COPY --from=composer /usr/bin/composer /usr/local/bin/composer

# COPY --from=node     /app/public                /var/www/public/
# COPY --from=node     /app/mix-manifest.json     /var/www/html/mix-manifest.json


RUN addgroup -g 1000 -S www && \
    adduser -u 1000 -S www -G www-data


COPY --chown=www:www-data . /var/www
# Assign permissions of the working directory to the www-data user
RUN chown -R www-data:www-data \
        /var/www/storage \
        /var/www/bootstrap/cache
# COPY . /var/www

WORKDIR /var/www

RUN cp ./.env.example ./.env.production

EXPOSE 8000
ENTRYPOINT php artisan serve --host=0.0.0.0 --port=8000
### PHP
########################################################################