import { RequestMapping } from "framework/decorators/RequestMapping";
import { Controller } from "framework/decorators/Controller";
import { HttpMethod } from "framework/constants/HttpMethods";
import { Log } from "framework/index";
import { createShare, getAllShares} from "../services"
import { MimeType } from "framework/constants/MimeTypes";
import { HttpStatusCode } from "framework/constants/HttpStatus";

@Controller()
export class ShareController{

    basePath = "/api/v1"

    @RequestMapping("/shares",HttpMethod.GET,{
        operationId: "getShare",
        summary: "Get Shares",
        tags: ["share"],
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
    getAllSharesController: Function = async (queries: any,params: any) => { 
        Log.debug("request", "Getting all the Share", { queries, params });
        return await getAllShares()
    }

    @RequestMapping("/create", HttpMethod.POST,{
        operationId: "createShare",
        summary: "Create Share",
        tags: ["share"],
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
    createShareController: Function = async (request_body: any, queries: any,params: any) => {
        Log.debug("request", "Creating Share", { request_body, queries, params });
        return await createShare(request_body);
    }

}