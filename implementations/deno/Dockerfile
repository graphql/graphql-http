FROM denoland/deno:1.29.2

# curl is necessary for healthchecks
RUN apt update && apt install curl -y

COPY index.ts .
RUN deno cache index.ts
