import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  // Get All Users
  findAll(): User[] {
    return this.users;
  }

  // Get User by ID
  findById(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Create a New User
  create(userData: Partial<User>): User {
    const user = {
      id: this.users.length + 1,
      ...userData,
    } as User;
    this.users.push(user);
    return user;
  }

  // Update an Existing User
  update(id: number, updatedData: Partial<User>): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = { ...this.users[userIndex], ...updatedData };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  // Delete a User
  delete(id: number): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }
}
