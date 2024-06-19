import { IsEmail } from "class-validator"
import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
export class UserModel {
	@Field(() => ID)
	id: string

	@Field(() => String)
	name: string

	@IsEmail()
	@Field(() => String)
	email: string

	@Field(() => String)
	password: string
}
