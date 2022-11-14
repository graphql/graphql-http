FROM mcr.microsoft.com/dotnet/sdk:7.0

WORKDIR /server

RUN dotnet new web
RUN dotnet add package HotChocolate.AspNetCore --version 13.0.0-preview.80
COPY Program.cs .
