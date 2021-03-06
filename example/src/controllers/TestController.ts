import { RequestMapping } from "microspringnode/decorators/RequestMapping";
import { Controller } from "microspringnode/decorators/Controller";
import { HttpMethod } from "microspringnode/constants/HttpMethods";
import { Log } from "microspringnode/index";
import { MimeType } from "microspringnode/constants/MimeTypes";
import { HttpStatusCode } from "microspringnode/constants/HttpStatus";

@Controller()
export class TestController{

    basePath = "/test"

    @RequestMapping("/test123", HttpMethod.GET, {
        operationId: "test123",
        summary: "test",
        tags: ["test"],
        responseBody: {
            produces: MimeType.JSON,
            responses: [
                {
                    status: HttpStatusCode.OK,
                    responseSchemaDefName: "Shape",
                    description: "Shape"
                }
            ]
        }
    })
    testcall: Function = (queries: any,params: any) => { 
        return {params, queries }
    }

    @RequestMapping("/test12",HttpMethod.GET,{
        operationId: "test12",
        summary: "test",
        tags: ["test"],
        responseBody: {
            produces: MimeType.JSON,
            responses: [
                {
                    status: HttpStatusCode.OK,
                    responseSchemaDefName: "Shape",
                    description: "Shape"
                }
            ]
        }
    })
    testcall1: Function = (queries: any,params: any) => { 
        return {params, queries }
    }

    @RequestMapping("/post", HttpMethod.POST,{
        operationId: "test123",
        summary: "test",
        tags: ["test"],
        requestBody:{
            consumes: MimeType.JSON,
            description: "Request Body",
            requestSchemaDefName: "ShapesData"
        },
        responseBody: {
            produces: MimeType.JSON,
            responses: [
                {
                    status: HttpStatusCode.OK,
                    responseSchemaDefName: "Shape",
                    description: "Shape"
                }
            ]
        }
    })
    postcall: Function = (request_body: any, queries: any,params: any) => {
        Log.debug("test", "test", { request_body, queries, params })
        return { request_body, queries, params }
    }

}
