import * as bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../entity/User';
import { UserData } from '../types';
import { Repository } from 'typeorm';
import { Roles } from '../constants';

export class UserService {
    constructor(private userRepository: Repository<User>) {}
    // Method to create a new user in the database
    async createUser({
        firstName,
        lastName,
        email,
        password,
    }: UserData): Promise<User> {
        // check if user already exist
        const isUserExists = await this.userRepository.findOne({
            where: { email: email },
        });
        if (isUserExists) {
            throw createHttpError(400, 'User already exists.');
        }
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

    // validateUser method to validate user credentials during login
    async validateUser(email: string, password: string): Promise<User> {
        // Find the user by email in the repository
        const user = await this.userRepository.findOne({
            where: { email: email },
        });
        if (!user) {
            throw createHttpError(401, 'Invalid email or password.');
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw createHttpError(401, 'Invalid email or password.');
        }
        return user;
    }
}
