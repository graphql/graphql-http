FROM php:8.1.21-cli

WORKDIR /app

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
    apt-get install --yes \
        git \
        libzip-dev \
        zip \
    && docker-php-ext-install \
        zip \
    && rm -rf /var/lib/apt/lists/*
RUN composer create-project laravel/laravel /app
RUN composer require nuwave/lighthouse 6.14.0
RUN php artisan vendor:publish --tag=lighthouse-schema
