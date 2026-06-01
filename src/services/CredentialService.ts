import bcrypt from 'bcrypt';

export class CredentialService {
    // Method to validate user credentials during login
    async comparePassword(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        // Use bcrypt to compare the plain password with the hashed password
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Method to hash a plain password before storing it in the database
    async hashPassword(plainPassword: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(plainPassword, saltRounds);
    }
}
