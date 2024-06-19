import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { prisma } from "../../utils"
import { TransferModel, UserAuthorizedModel } from "../models"
import { Context } from "../auth"
import jwt from "jsonwebtoken"
import { TransferDto } from "../dtos"

interface TokenProps {
	id: string
}

@Resolver()
export class UserAuthorizedResolver {
	@Authorized()
	@Query(() => UserAuthorizedModel)
	async getUserById(@Ctx() ctx: Context) {
		const token = ctx.req.headers.authorization
		const secret = process.env.SECRET
		if (!secret) {
			throw new Error("")
		}
		const { id } = jwt.verify(token, secret) as TokenProps
		const user = await prisma.user.findUnique({ where: { id } })
		return user
	}

	@Authorized()
	@Query(() => [TransferModel])
	async getTransfers(@Ctx() ctx: Context) {
		const token = ctx.req.headers.authorization
		const secret = process.env.SECRET
		if (!secret) {
			throw new Error("")
		}
		const { id } = jwt.verify(token, secret) as TokenProps
		const transfers = await prisma.transfer.findMany({ where: { userId: id } })
		return transfers
	}

	@Authorized()
	@Mutation(() => TransferModel)
	async addTransfer(
		@Arg("data", () => TransferDto) data: TransferDto,
		@Ctx() ctx: Context
	) {
		const token = ctx.req.headers.authorization
		const secret = process.env.SECRET
		if (!secret) {
			throw new Error("")
		}
		const { id } = jwt.verify(token, secret) as TokenProps

		const transfer = await prisma.transfer.create({
			data: { ...data, userId: id },
			include: { user: { select: { id: true } } },
		})

		return transfer
	}
}
