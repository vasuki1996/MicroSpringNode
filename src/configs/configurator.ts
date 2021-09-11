import { appConfigs } from "..";
import { LoggerConfiguration } from "../components/logger";
import { getDefaultDatabase } from "../components/persistance";
import { Connection } from 'typeorm';
import { DatabaseConfiguration } from '../components/persistance/interface/DatabaseConfig'

export interface Configurations {
    appName: string
    port: number
    cors: boolean
    enableSSL: boolean
    ssl? : SSL
    logger?: LoggerConfiguration
    database?: DatabaseConfiguration
}

interface SSL {
    cert: string
    privKey: string
}

export const getConfigs = (configs: any) => {
    console.log("Constructing App Configs")
    let constructConfigs: Configurations = {
        appName: configs.application.name ? configs.application.name : 'Generic Service',
        port: configs.server.port ? configs.server.port : 8080,
        cors: configs.server.cors ? configs.server.cors : false,
        enableSSL: configs.server.ssl ? configs.server.ssl : false
    };
    if(configs.ssl){
        constructConfigs.ssl["cert"] = configs.server["key-store"]["cert"];
        constructConfigs.ssl["privKey"] = configs.server["key-store"]["priv-key"];
    }
    if(configs.logger){
        constructConfigs.logger = configs.logger;
    }
    console.log(constructConfigs.logger)
    return constructConfigs;   
}

