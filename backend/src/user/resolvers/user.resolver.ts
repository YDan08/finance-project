import { Arg, Mutation, Resolver } from "type-graphql"
import { UserModel } from "../models/user.model"
import { prisma } from "../../utils"
import { compare, hash } from "bcryptjs"
import jwt from "jsonwebtoken"
import { LoginModel } from "../models/login.model"
import { CreateUserDto, LoginDto } from "../dtos"

@Resolver()
export class UserResolver {
	@Mutation(() => UserModel)
	async createUser(@Arg("data", () => CreateUserDto) data: CreateUserDto) {
		const hashPassword = await hash(data.password, 10)
		const user = await prisma.user.create({ data: { ...data, password: hashPassword } })
		return user
	}

	@Mutation(() => LoginModel, { nullable: true })
	async login(@Arg("data", () => LoginDto) data: LoginDto) {
		const user = await prisma.user.findUnique({ where: { email: data.email } })
		if (!user) return null
		const validation = await compare(data.password, user.password)
		if (!validation) return null

		const secret = process.env.SECRET
		if (!secret) return null
		const token = jwt.sign(
			{
				id: user.id,
			},
			secret
		)

		return { token }
	}
}
