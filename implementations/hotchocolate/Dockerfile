FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /server

RUN dotnet new web
RUN dotnet add package HotChocolate.AspNetCore --version 14.0.0
COPY Program.cs .
