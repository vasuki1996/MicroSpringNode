import * as TJS from "typescript-json-schema";
import { contextRoot } from "../../..";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { join, resolve, extname } from "path";
import { EndpointDocumentation } from "../../../interface/EndpointDocumentation";
import { Configurations } from "../../../configs/configurator";

export const docu_gen = (config: Configurations,getRoutes: Map<string, EndpointDocumentation>, postRoutes: Map<string, EndpointDocumentation>, putRoutes: Map<string, EndpointDocumentation>, patchRoutes: Map<string, EndpointDocumentation>, deleteRoutes: Map<string, EndpointDocumentation>) => {
    const openapi: any = {
        openapi: "3.0.1",
        info: {
            title: config.appName ? config.appName : "Microservice Node",
            description: config.description ? config.description : "This is a simple server",
            termsOfService: config.terms_of_service_url ? config.terms_of_service_url : "http://swagger.io/terms/",
            contact: {
                email: config.contact_email ? config.contact_email : "apiteam@swagger.io"
            },
            license: {
                name: config.license_name ? config.license_name : "Apache 2.0",
                url: config.license_url ? config.license_url : "http://www.apache.org/licenses/LICENSE-2.0.html"
            },
            version: config.version ? config.version : "1.0.0"
        },
        paths: {},
        components: {}
    }
    const schemas = generateSchemas();
    openapi["components"]["schemas"] = schemas.definitions;
    getRoutes.forEach((endpoint_doc, endpoint) => {
        openapi["paths"][`${endpoint}`] = {
            get: {
                tags: endpoint_doc.tags ? endpoint_doc.tags : [],
                summary: endpoint_doc.summary,
                operationId: endpoint_doc.operationId,
                responses: getResponses(endpoint_doc)
            }
        }
    });
    postRoutes.forEach((endpoint_doc, endpoint) => {
        openapi["paths"][`${endpoint}`] = {
            post: {
                tags: endpoint_doc.tags ? endpoint_doc.tags : [],
                summary: endpoint_doc.summary,
                operationId: endpoint_doc.operationId,
                requestBody: {
                    description: endpoint_doc.requestBody.description ? endpoint_doc.requestBody.description : "",
                    content: endpoint_doc.requestBody.isArray ? {
                        [`${endpoint_doc.requestBody.consumes}`] : {
                            schema : {
                                type: "array",
                                items: {
                                    "$ref": `#/components/schemas/${endpoint_doc.requestBody.requestSchemaDefName}`
                                }
                            }
                        }
                    } : {
                        [`${endpoint_doc.requestBody.consumes}`] : {
                            schema : {
                                "$ref": `#/components/schemas/${endpoint_doc.requestBody.requestSchemaDefName}`
                            }
                        }
                    }
                },
                responses: getResponses(endpoint_doc)
            }
        }
    });
    putRoutes.forEach((endpoint_doc, endpoint) => {
        openapi["paths"][`${endpoint}`] = {
            put: {
                tags: endpoint_doc.tags ? endpoint_doc.tags : [],
                summary: endpoint_doc.summary,
                operationId: endpoint_doc.operationId,
                requestBody: {
                    description: endpoint_doc.requestBody.description ? endpoint_doc.requestBody.description : "",
                    content: endpoint_doc.requestBody.isArray ? {
                        [`${endpoint_doc.requestBody.consumes}`] : {
                            schema : {
                                type: "array",
                                items: {
                                    "$ref": `#/components/schemas/${endpoint_doc.requestBody.requestSchemaDefName}`
                                }
                            }
                        }
                    } : {
                        [`${endpoint_doc.requestBody.consumes}`] : {
                            schema : {
                                "$ref": `#/components/schemas/${endpoint_doc.requestBody.requestSchemaDefName}`
                            }
                        }
                    }
                },
                responses: getResponses(endpoint_doc)
            }
        }
    });
    patchRoutes.forEach((endpoint_doc, endpoint) => {
        openapi["paths"][`${endpoint}`] = {
            patch: {
                tags: endpoint_doc.tags ? endpoint_doc.tags : [],
                summary: endpoint_doc.summary,
                operationId: endpoint_doc.operationId,
                requestBody: {
                    description: endpoint_doc.requestBody.description ? endpoint_doc.requestBody.description : "",
                    content: endpoint_doc.requestBody.isArray ? {
                        [`${endpoint_doc.requestBody.consumes}`] : {
                            schema : {
                                type: "array",
                                items: {
                                    "$ref": `#/components/schemas/${endpoint_doc.requestBody.requestSchemaDefName}`
                                }
                            }
                        }
                    } : {
                        [`${endpoint_doc.requestBody.consumes}`] : {
                            schema : {
                                "$ref": `#/components/schemas/${endpoint_doc.requestBody.requestSchemaDefName}`
                            }
                        }
                    }
                },
                responses: getResponses(endpoint_doc)
            }
        }
    });
    deleteRoutes.forEach((endpoint_doc, endpoint) => {
        openapi["paths"][`${endpoint}`] = {
            post: {
                tags: endpoint_doc.tags ? endpoint_doc.tags : [],
                summary: endpoint_doc.summary,
                operationId: endpoint_doc.operationId,
                responses: getResponses(endpoint_doc)
            }
        }
    });

    return openapi;
}

const getResponses = (doc: EndpointDocumentation) => {
    const mimetype = doc.responseBody.produces;
    const response_set: any = {};
    for (let index = 0; index < doc.responseBody.responses.length; index++) {
        const element = doc.responseBody.responses[index];
        response_set[`${element.status}`] = {
            description: element.description ? element.description : `${element.status} response`,
            content: element.isArray ? {
                [`${mimetype}`] : {
                    schema: {
                        type: "array",
                        items: {
                            "$ref": `#/components/schemas/${element.responseSchemaDefName}`
                        }
                    }
                }
            } : {
                [`${mimetype}`] : {
                    schema: {
                        "$ref": `#/components/schemas/${element.responseSchemaDefName}`
                    }
                }
            }
        }
    }

    return response_set;
}

export const generateSchemas = () => {

    const settings: TJS.PartialArgs = {
        required: true,
        strictNullChecks: true,
        noExtraProps: true,
        ignoreErrors: true
    };

    const basePath = join(contextRoot, "src", "dto");

    const fileList = readdirSync(basePath);

    const EXTENSION = '.ts';

    const targetFiles = fileList.filter(file => {
        return extname(file).toLowerCase() === EXTENSION;
    });
    const resolvedTargetFiles: Array<string> = new Array<string>();

    for (let index = 0; index < targetFiles.length; index++) {
        const element = targetFiles[index];
        resolvedTargetFiles.push(resolve(basePath, element));
    }

    const program = TJS.getProgramFromFiles(
        resolvedTargetFiles
    );

    const generator = TJS.buildGenerator(program, settings);

    console.debug((!generator) ? generator : "Generator Initialized");

    const schemaWithReusedGenerator = generator.getSchemaForSymbols(generator.getMainFileSymbols(program));

    if(existsSync(join(contextRoot, "resources", "schema"))){
        mkdirSync(join(contextRoot, "resources", "schema"), { recursive: true })
    }

    writeFileSync(join(contextRoot, "resources", "schema", "schema.json"), JSON.stringify(schemaWithReusedGenerator, null, 2));

    return schemaWithReusedGenerator;
}