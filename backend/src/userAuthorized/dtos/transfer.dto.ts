import { IsBoolean, IsNumber } from "class-validator"
import { Field, Float, InputType } from "type-graphql"

@InputType()
export class TransferDto {
	@IsNumber()
	@Field(() => Float)
	value: number

	@IsBoolean()
	@Field(() => Boolean)
	increment: boolean
}
