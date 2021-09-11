import path from "path";
import { createConnection } from "typeorm";
import { contextRoot } from "../../..";

export const getDefaultDatabase = async () => {
    const isCompiled = path.extname(__filename).includes('js');
    const connection = await createConnection({
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