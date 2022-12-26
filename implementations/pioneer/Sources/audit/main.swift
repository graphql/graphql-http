import class Foundation.ProcessInfo
import Pioneer
import GraphQL

let schema = try GraphQLSchema(
    query: GraphQLObjectType(
        name: "Query", 
        fields: [
            "_": GraphQLField(
                type: GraphQLString, 
                resolve: { _, _, _, _ in
                    "_"
                }
            )
        ]
    )
)

let server = Pioneer<Void, Void>(schema: schema, resolver: ())


try server.standaloneServer(
    port: ProcessInfo.processInfo.environment["PORT"]?.intValue ?? 4000,
    host: "0.0.0.0"
)
