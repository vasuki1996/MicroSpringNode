import { getDefaultDatabase } from 'framework/components/persistance';

export const getDatabseConnection = async () => {
    const connection = await getDefaultDatabase();
    return connection;
}
