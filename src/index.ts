import process from "process";
export const contextRoot = process.cwd();
const path = require('path');
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getConfigs, Configurations as ConfigurationsInterface } from './configs/configurator';
export const appConfigs: ConfigurationsInterface = getConfigs(require(path.join(contextRoot,"resources","application.json")));
import { ResponseEntity } from './models/ResponseEntity';
import { getRoutes, postRoutes, putRoutes, patchRoutes, deleteRoutes, ControllerMap, getRoutesDocs, patchRoutesDocs, postRoutesDocs, putRoutesDocs, deleteRoutesDocs } from './decorators/RequestMapping';
import { Log } from './components/logger'; 
import { initializeLogger } from './components/logger/cloudwatch';
import { docu_gen } from "./components/swagger/services/generator";
import * as swaggerUi from "swagger-ui-express";

const log4js = require('log4js');

const app = express();

const respond  = (result: any, res: express.Response) => {
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
    const openapi_doc = docu_gen(appConfigs, getRoutesDocs, postRoutesDocs, putRoutesDocs, patchRoutesDocs, deleteRoutesDocs);
    if(appConfigs.cors){
        app.use(cors());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(log4js.connectLogger(log4js.getLogger("framework"), { level: 'auto' }));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi_doc));
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

export { start, Log }