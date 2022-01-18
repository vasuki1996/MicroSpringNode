import { appConfigs as Configuration } from '../..';
import { CloudwatchConfiguration, log as LogAtCloudwatch} from './cloudwatch';
import { FluentDLogConfiguration } from './fluentd';
import { KafkaLoggerConfiguration } from "./kafka";
import { RollingFileConfiguration } from "./rolling_file";

export interface LoggerConfiguration {
    level: string
    rolling_file?: RollingFileConfiguration
    enable_kafka?: boolean
    kafka?: KafkaLoggerConfiguration
    enable_fluent?: boolean
    fluent?: FluentDLogConfiguration
    enable_cloudwatch?: boolean
    cloudwatch?: CloudwatchConfiguration
}

export const Log = {
    config: Configuration,
    debug: (action: string, message: string, options?: any) => {
        if(Configuration.logger && Configuration.logger.enable_cloudwatch){
            LogAtCloudwatch('debug', action, message, options ? options : null)
        }
    },
    info: (action: string, message: string, options?: any) => {
        if(Configuration.logger && Configuration.logger.enable_cloudwatch){
            LogAtCloudwatch('info', action, message, options ? options : null)
        }
    },
    warn: (action: string, message: string, options?: any) => {
        if(Configuration.logger && Configuration.logger.enable_cloudwatch){
            LogAtCloudwatch('warn', action, message, options ? options : null)
        }
    },
    trace: (action: string, message: string, options?: any) => {
        if(Configuration.logger && Configuration.logger.enable_cloudwatch){
            LogAtCloudwatch('trace', action, message, options ? options : null)
        }
    },
    error: (action: string, message: string, options?: any) => {
        if(Configuration.logger && Configuration.logger.enable_cloudwatch){
            LogAtCloudwatch('error', action, message, options ? options : null)
        }
    }
}