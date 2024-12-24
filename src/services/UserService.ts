import { User } from '../entity/User';
import { UserData } from '../types';
import { Repository } from 'typeorm';

export class UserService {
    constructor(private userRepository: Repository<User>) {}
    // Method to create a new user in the database
    async createUser({ firstName, lastName, email, password }: UserData) {
        // Save the new user data in the repository
        await this.userRepository.save({
            firstName,
            lastName,
            email,
            password,
        });
    }
}
