import process from "process";
export const contextRoot = process.cwd();
const path = require('path');
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getConfigs, Configurations as ConfigurationsInterface } from './configs/configurator';
export const appConfigs: ConfigurationsInterface = getConfigs(require(path.join(contextRoot,"resources","application.json")));
import { ResponseEntity } from './models/ResponseEntity';
import { getRoutes, postRoutes, putRoutes, patchRoutes, deleteRoutes, ControllerMap } from './decorators/RequestMapping';
import { Log } from './components/logger'; 
import { initializeLogger } from './components/logger/cloudwatch';

const log4js = require('log4js');

const app = express();
 

const constructServer = (contextRoot: string, getRoutes?: Map<string, Function>, postRoutes?: Map<string, Function>, putRoutes?: Map<string, Function>, deleteRoutes?: Map<string, Function>, patchRoutes?: Map<string, Function>) => {
    // let appConfigs: Configurations = getConfigs(yaml.safeLoad(fs.readFileSync(path.join(contextRoot,"resources","application.yml"))));
    if(appConfigs.cors){
        app.use(cors());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(log4js.connectLogger(log4js.getLogger("framework"), { level: 'auto' }));
    if(getRoutes){
        getRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.get(endpoint, (req: any,res: any) => {
                if(req.query && req.params){
                    let result = call(req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = call(req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = call(req.params);
                    respond(result, res)
                } else{
                    let result = call();
                    respond(result, res)
                }
            });
        });
    }
    if(postRoutes){
        postRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.post(endpoint, (req: any,res: any) => {
                if(req.query && req.params){
                    let result = call(req.body, req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = call(req.body, req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = call(req.body, req.params);
                    respond(result, res)
                } else{
                    let result = call(req.body);
                    respond(result, res)
                }
            });
        });
    }
    if(putRoutes){
        putRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.put(endpoint, (req: any,res: any) => {
                if(req.query && req.params){
                    let result = call(req.body, req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = call(req.body, req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = call(req.body, req.params);
                    respond(result, res)
                } else{
                    let result = call(req.body);
                    respond(result, res)
                }
            });
        });
    }
    if(patchRoutes){
        patchRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.patch(endpoint, (req: any,res: any) => {
                if(req.query && req.params){
                    let result = call(req.body, req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = call(req.body, req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = call(req.body, req.params);
                    respond(result, res)
                } else{
                    let result = call(req.body);
                    respond(result, res)
                }
            });
        });
    }
    if(deleteRoutes){
        deleteRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.delete(endpoint, (req: any,res: any) => {
                if(req.query && req.params){
                    let result = call(req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = call(req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = call(req.params);
                    respond(result, res)
                } else{
                    let result = call();
                    respond(result, res)
                }
            });
        });
    }
    app.listen(appConfigs.port, () => {
        console.log(`${appConfigs.appName} started on port ${appConfigs.port}`);
    });
}

const respond  = (result: any, res: any) => {
    if(result instanceof Promise){
        result.then((r: any) => {
            if(r instanceof ResponseEntity){
                res.status(r.statusCode).json(r.object);
            } else {
                res.status(200).json(r);
            }
        })
        .catch(error => {
            console.error("ERROR:", error);
            let errorResponse = {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                debug: error
            }
            res.status(500).json(errorResponse); 
        });
    } else {
        if(result instanceof ResponseEntity){
            res.status(result.statusCode).json(result.object);
        } else {
            res.status(200).json(result);
        }
    }
}

const start = () => {
    console.log("PATH => ", path.join(contextRoot, "resources","application.yml"));
    console.log("ControllerMap", ControllerMap);
    initializeLogger();
    console.log("Configuration", appConfigs);
    if(appConfigs.cors){
        app.use(cors());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(log4js.connectLogger(log4js.getLogger("framework"), { level: 'auto' }));
    if(getRoutes){
        getRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.get(endpoint, async (req: any,res: any) => {
                if(req.query && req.params){
                    let result = await call(req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = await call(req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = await call(req.params);
                    respond(result, res)
                } else{
                    let result = await call();
                    respond(result, res)
                }
            });
        });
    }
    if(postRoutes){
        postRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.post(endpoint, async (req: any,res: any) => {
                if(req.query && req.params){
                    let result = await call(req.body, req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = await call(req.body, req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = await call(req.body, req.params);
                    respond(result, res)
                } else{
                    let result = await call(req.body);
                    respond(result, res)
                }
            });
        });
    }
    if(putRoutes){
        putRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.put(endpoint, async (req: any,res: any) => {
                if(req.query && req.params){
                    let result = await call(req.body, req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = await call(req.body, req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = await call(req.body, req.params);
                    respond(result, res)
                } else{
                    let result = await call(req.body);
                    respond(result, res)
                }
            });
        });
    }
    if(patchRoutes){
        patchRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.patch(endpoint, async (req: any,res: any) => {
                if(req.query && req.params){
                    let result = await call(req.body, req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = await call(req.body, req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = await call(req.body, req.params);
                    respond(result, res)
                } else{
                    let result = await call(req.body);
                    respond(result, res)
                }
            });
        });
    }
    if(deleteRoutes){
        deleteRoutes.forEach((call: Function, endpoint: string, map: Map<string, Function>) => {
            app.delete(endpoint, async (req: any,res: any) => {
                if(req.query && req.params){
                    let result = await call(req.query, req.params);
                    respond(result, res)
                } else if(req.query && !req.params){
                    let result = await call(req.query);
                    respond(result, res)
                } else if(!req.query && req.params){
                    let result = await call(req.params);
                    respond(result, res)
                } else{
                    let result = await call();
                    respond(result, res)
                }
            });
        });
    }
    app.listen(appConfigs.port, () => {
        console.log(`${appConfigs.appName} started on port ${appConfigs.port}`);
    });
}

export { constructServer, start, Log }