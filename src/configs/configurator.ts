import { LoggerConfiguration } from "../components/logger";
import { DatabaseConfiguration } from '../components/persistance/interface/DatabaseConfig'

export interface Configurations {
    appName: string
    description?: string
    contact_email?: string
    license_name?: string
    license_url?: string
    version?: string
    terms_of_service_url?: string
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
        description: configs.application.description ? configs.application.description : 'Generic Service Description',
        contact_email: configs.application.contact_email ? configs.application.contact_email : 'admin@company.com',
        license_name: configs.application.license_name ? configs.application.license_name : 'Apache 2.0',
        license_url: configs.application.license_url ? configs.application.license_url : 'http://www.apache.org/licenses/LICENSE-2.0.html',
        version: configs.application.version ? configs.application.version : '1.0.0',
        terms_of_service_url: configs.application.terms_of_service_url ? configs.application.terms_of_service_url : 'http://swagger.io/terms/',
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

