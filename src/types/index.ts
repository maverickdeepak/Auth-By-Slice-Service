import express from 'express';

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegisterUserRequest extends express.Request {
    body: UserData;
}

export interface LoginUserRequest extends express.Request {
    body: {
        email: string;
        password: string;
    };
}

export interface TokenPayload {
    sub: string;
    role: string;
}
