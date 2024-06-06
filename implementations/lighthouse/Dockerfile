# See https://hub.docker.com/_/php/tags?page=&page_size=&ordering=&name=cli.
FROM php:8.2.19-cli

# See https://getcomposer.org.
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Required to make the composer installations work.
RUN apt-get update \
    && apt-get install --yes \
        git \
        libzip-dev \
        zip \
    && docker-php-ext-install \
        zip \
    && rm -rf /var/lib/apt/lists/*

# Creating a project following https://laravel.com/docs/installation#creating-a-laravel-project.
# See https://github.com/laravel/laravel/releases for new versions.
WORKDIR /app
RUN composer create-project laravel/laravel=11.1.1 /app

# See https://github.com/nuwave/lighthouse/releases for new versions.
RUN composer require nuwave/lighthouse:6.36.3

# Following https://lighthouse-php.com/6/getting-started/installation.html#publish-the-default-schema.
RUN php artisan vendor:publish --tag=lighthouse-schema
