import { IsBoolean, IsNumber } from "class-validator"
import { Field, Float, ID, ObjectType } from "type-graphql"

@ObjectType()
export class TransferModel {
	@Field(() => ID)
	id: string

	@IsNumber()
	@Field(() => Float)
	value: number

	@IsBoolean()
	@Field(() => Boolean)
	increment: boolean

	@Field(() => ID)
	userId: string
}
