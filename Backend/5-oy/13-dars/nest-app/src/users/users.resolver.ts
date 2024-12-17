import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  // Get All Users
  @Query(() => [User], { name: 'users' })
  getUsers(): User[] {
    return this.userService.findAll();
  }

  // Get User by ID
  @Query(() => User, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: number): User {
    return this.userService.findById(id);
  }

  // Create a New User
  @Mutation(() => User)
  createUser(@Args('name') name: string, @Args('email') email: string): User {
    return this.userService.create({ name, email });
  }

  // Update an Existing User
  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('email', { nullable: true }) email?: string,
  ): User {
    return this.userService.update(id, { name, email });
  }

  // Delete a User
  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number): User {
    return this.userService.delete(id);
  }
}
