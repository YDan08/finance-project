import "reflect-metadata"

import { buildSchema } from "type-graphql"
import { UserResolver } from "./user"
import { config } from "dotenv"
import { Authentication, UserAuthorizedResolver } from "./userAuthorized"
import { ApolloServer } from "apollo-server"

const app = async () => {
	config()

	const schema = await buildSchema({
		resolvers: [UserResolver, UserAuthorizedResolver],
		authChecker: Authentication,
	})

	const server = new ApolloServer({ schema, context: ({ req }: any) => ({ req }) })

	const { url } = await server.listen(process.env.PORT || 4000)

	console.log(`Server running on ${url}`)
}

app()
