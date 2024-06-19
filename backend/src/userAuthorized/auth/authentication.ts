import { AuthChecker } from "type-graphql"
import jwt from "jsonwebtoken"

export interface Context {
	req: {
		headers: {
			authorization: string
		}
	}
}

export const Authentication: AuthChecker<Context> = ({ context }) => {
	const token = context.req.headers.authorization
	if (!token) {
		throw new Error("Acesso negado")
	}

	const secret = process.env.SECRET
	if (!secret) {
		throw new Error("")
	}

	try {
		jwt.verify(token, secret)
	} catch (e) {
		throw new Error("Token invalido")
	}

	return true
}
