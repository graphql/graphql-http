var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();

var app = builder.Build();

app.MapGraphQL();

app.Run();

public class Query
{
    public string Hello { get { return "world"; } }
}

public class Mutation {
    public string DontChange { get { return "ok"; } }
}
