import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTodoInput {
  @Field()
  @Length(1, 255)
  todoTitle: string;

  @Field()
  todoBody: string;

  @Field()
  @Length(0, 255)
  fileName: string;

  @Field()
  todoGroupId: number;
}
