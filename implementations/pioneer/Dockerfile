FROM swift:latest
WORKDIR /root
RUN apt update
RUN apt install curl -y
COPY ./Package.* ./
RUN swift package resolve
COPY ./Sources ./Sources
RUN swift build -c release
