import path from 'path';
import { contextRoot } from '../../..';
import { getConfigs } from '../../../configs/configurator';
import { getLoggerConfiguration } from './configure';
import { Cloudwatch as CloudwatchConfiguration } from './interface/CloudwatchConfig'
const readConfig = require(path.join(contextRoot,"resources","application.json"));
const AppConfig = getConfigs(readConfig);
console.log("STAR_CONFIG => ", readConfig);
var initializeLogger: Function;
var log: Function;

if(AppConfig.logger?.enable_cloudwatch){
    const getCloudWatchConfigs = (configs: any) => {
        console.log("Constructing App Configs")
        if(configs.logger){
            configs.logger = getLoggerConfiguration(configs.logger, configs.appName);
        }
        console.log(configs.logger)
        return configs;   
    }
    
    const appConfigs= getCloudWatchConfigs(AppConfig);
    const log4js = require("log4js");
    
    console.log("HERE => ", appConfigs);
    
    const config = {
        appenders: {
            aws: appConfigs.logger.cloudwatch
        },
        categories: {
            default: { appenders: ['aws'], level: 'info' }
        }
    }
    
    const traceLogger = log4js.getLogger('trace');
    traceLogger.level = 'trace';
    
    const infoLogger = log4js.getLogger('info');
    infoLogger.level = 'info';
    
    const debugLogger = log4js.getLogger('debug');
    debugLogger.level = 'debug';
    
    const warnLogger = log4js.getLogger('warn');
    warnLogger.level = 'warn';
    
    const errorLogger = log4js.getLogger('error');
    errorLogger.level = 'error';
    
    log4js.configure(config);
    
    log = (log_level: string, action: string, message: any, options?: any) => {
        let log: any = {
            ts: new Date(),
            service: appConfigs.appName,
            action,
            message
        };
        if(options){
            let optionKeys = Object.keys(options);
            for (let index = 0; index < optionKeys.length; index++) {
                const element = options[optionKeys[index]];
                log[optionKeys[index]] = element;
            }
        }
        switch(log_level){
            case 'trace' : {
                log.level = traceLogger.level;
                traceLogger.trace(log.request_id, action, JSON.stringify(log, null, 2));
                break;
            }
            case 'info' : {
                log.level = infoLogger.level;
                infoLogger.trace(log.request_id, action, JSON.stringify(log, null, 2));
                break;
            }
            case 'debug' : {
                log.level = debugLogger.level;
                debugLogger.info(log.request_id, action, JSON.stringify(log, null, 2));
                break;
            }
            case 'warn' : {
                log.level = warnLogger.level;
                warnLogger.error(log.request_id, action, JSON.stringify(log, null, 2));
                break;
            }
            case 'error' : {
                log.level = errorLogger.level;
                errorLogger.error(log.request_id, action, JSON.stringify(log, null, 2));
                break;
            }
        }
    }
    
    initializeLogger = () => {
        log("info", "start", "logger initialzed");
    }  
}

export { CloudwatchConfiguration, log, initializeLogger }  
