import { IsEmail, IsString } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class LoginDto {
	@IsEmail()
	@Field(() => String)
	email: string

	@IsString()
	@Field(() => String)
	password: string
}
