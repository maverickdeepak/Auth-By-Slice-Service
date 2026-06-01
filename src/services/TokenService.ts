import { JwtPayload, sign } from 'jsonwebtoken';
import * as fs from 'node:fs';
import path from 'node:path';
import createHttpError from 'http-errors';
import { Config } from '../config';
import { RefreshToken } from '../entity/RefreshToken';
import { User } from '../entity/User';
import { Repository } from 'typeorm';

export class TokenService {
    constructor(private refreshTokenRepository: Repository<RefreshToken>) {}
    async persistRefreshToken(user: User): Promise<RefreshToken> {
        const newRefreshToken = await this.refreshTokenRepository.save({
            user,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        });
        return newRefreshToken;
    }
    generateAccessToken(payload: JwtPayload) {
        let privateKey: Buffer;
        try {
            privateKey = fs.readFileSync(
                path.resolve(__dirname, '../../certs/private.pem')
            );
        } catch (err) {
            console.error(err);
            const error = createHttpError(500, 'Failed to load private key.');
            throw error;
        }
        const accessToken = sign(payload, privateKey, {
            expiresIn: '1h',
            algorithm: 'RS256',
            issuer: 'auth-service',
        });
        return accessToken;
    }

    generateRefreshToken(payload: JwtPayload, newRefreshToken: { id: string }) {
        const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
            expiresIn: '1y',
            algorithm: 'HS256',
            issuer: 'auth-service',
            jwtid: String(newRefreshToken.id),
        });

        return refreshToken;
    }
}
