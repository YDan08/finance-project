import { IsEmail, IsString } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class CreateUserDto {
	@IsString()
	@Field(() => String)
	name: string

	@IsEmail()
	@Field(() => String)
	email: string

	@IsString()
	@Field(() => String)
	password: string
}
