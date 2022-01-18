import path from "path";
import {BaseEntity, Connection, createConnection, EntityTarget, Repository} from "typeorm";
import { contextRoot } from "../../..";

export const getDefaultDatabase = async (): Promise<Connection> => {
    const isCompiled = path.extname(__filename).includes('js');
    const connection: Connection = await createConnection({
        name: "default",
        type: "sqlite",
        database: path.join(contextRoot, "database.db"),
        synchronize: true,
        cache: true,
        logging: true,
        entities: [`${contextRoot}/src/entity/**/*.ts`],
        migrations: [`${contextRoot}/src/migration/**/*.ts'}`],
        cli: {
            entitiesDir: `${contextRoot}/src/entity`,
	},
    });
    return connection;
}

export const getRepository = async (entity: EntityTarget<any>): Promise<Repository<any>> => {
    const connection = await getDefaultDatabase();
    const repository: Repository<any> = connection.getRepository(entity);
    return repository;
}


