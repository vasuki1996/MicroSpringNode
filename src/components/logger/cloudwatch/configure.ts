import { Cloudwatch } from "./interface/CloudwatchConfig";

export const getLoggerConfiguration = (config: any, appName: string) => {
    const rolling_date = new Date();
    const final_config: any = config
    console.log("START LOG CONFIG BUILD => ", final_config);
    if(config.enable_cloudwatch){
        let cloudwatch_config: Cloudwatch = {
            type: "log4js-cloudwatch-appender"
        };
        if(config.cloudwatch?.accessKeyId){
            cloudwatch_config.accessKeyId = config.cloudwatch.accessKeyId;
        }
        if(config.cloudwatch?.secretAccessKey){
            cloudwatch_config.secretAccessKey = config.cloudwatch.secretAccessKey;
        }
        if(config.cloudwatch?.layout){
            cloudwatch_config.layout = config.cloudwatch.layout;
        }
        if(config.cloudwatch?.lawgsConfig){
            cloudwatch_config.lawgsConfig = config.cloudwatch.lawgsConfig;
        }
        cloudwatch_config.region = config.cloudwatch?.region ? config.cloudwatch.region : "us-east-2";
        cloudwatch_config.logGroup = config.cloudwatch?.logGroup ? config.cloudwatch.logGroup : "prod";
        cloudwatch_config.logStream = config.cloudwatch?.logStream ? config.cloudwatch.logStream : `${appName}-${process.env.NODE_ENV ? process.env.NODE_ENV : "prod"}-${rolling_date.getDate()}-${rolling_date.getMonth() + 1}-${rolling_date.getFullYear()}`;
        final_config["cloudwatch"] = cloudwatch_config; 
    }
    console.log("FINAL LOG CONFIG BUILD => ", final_config);
    return final_config;
}