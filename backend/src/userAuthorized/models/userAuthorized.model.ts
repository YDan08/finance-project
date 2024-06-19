import { ObjectType } from "type-graphql"
import { UserModel } from "../../user/models"

@ObjectType()
export class UserAuthorizedModel extends UserModel {}
