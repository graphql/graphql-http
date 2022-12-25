FROM swift:latest as builder
WORKDIR /root
COPY ./Package.* ./
RUN swift package resolve
COPY . .
RUN swift build