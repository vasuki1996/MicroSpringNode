export interface DatabaseConfiguration {
    default: true,
    mysql: MySQLConnection,
    postgres: PostgresConnection
}

interface GenericSQLConnection {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    synchronize?: boolean
	logging?: boolean
	autoReconnect?: boolean,
	reconnectTries?: number,
	reconnectInterval?: boolean,
	entities?: Array<string>,
	migrations?: Array<string>,
	cli?: CLIOptions,
}

interface CLIOptions {
    entities: string
}

interface MySQLConnection extends GenericSQLConnection {}

interface PostgresConnection extends GenericSQLConnection {}