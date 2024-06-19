import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./user"
import { config } from "dotenv"
import { Authentication, UserAuthorizedResolver } from "./userAuthorized"

const app = async () => {
	config()

	const schema = await buildSchema({
		resolvers: [UserResolver, UserAuthorizedResolver],
		authChecker: Authentication,
		validate: true,
	})

	const server = new ApolloServer({
		schema,
	})

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	})

	console.log(`Server running on ${url}`)
}

app()
