import { DataSource } from 'typeorm';

export const truncateTable = async (connection: DataSource) => {
    const entities = connection.entityMetadatas;

    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        await repository.clear();
    }
}

export const isJwt = (token: string): boolean => {
    const parts = token.split('.');
    if(parts.length !== 3) {
        return false;
    }

    try {
        parts.forEach(part => Buffer.from(part, 'base64').toString('utf-8'));
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
