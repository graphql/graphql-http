FROM mcr.microsoft.com/dotnet/sdk:7.0

WORKDIR /server

RUN dotnet new web
RUN dotnet add package HotChocolate.AspNetCore;
COPY Program.cs .
