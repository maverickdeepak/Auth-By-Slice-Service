import * as bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../entity/User';
import { UserData } from '../types';
import { Repository } from 'typeorm';
import { Roles } from '../constants';

export class UserService {
    constructor(private userRepository: Repository<User>) {}
    // Method to create a new user in the database
    async createUser({ firstName, lastName, email, password }: UserData) {
        // hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
            // Save the new user data in the repository
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            });
        } catch (err) {
            const error = createHttpError(500, 'Failed to store user data.');
            throw error ? error : err;
        }
    }
}
