import { IsString } from "class-validator"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class LoginModel {
	@IsString()
	@Field(() => String)
	token: string
}
