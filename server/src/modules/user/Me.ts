import { MyContext } from "../../../src/types/MyContext";
import { Resolver, Query, Ctx, UseMiddleware, Mutation } from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if ((ctx.req as any).userId == null) return undefined;

    return User.findOne((ctx.req as any).userId);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean, { nullable: true })
  async invalidateTokens(@Ctx() { req, res }: MyContext): Promise<boolean> {
    if (!req.userId) return false;

    const user = await User.findOne(req.userId);
    if (!user) return false;

    user.count += 1;
    await user.save();

    res.clearCookie("access-token");

    return true;
  }
}
