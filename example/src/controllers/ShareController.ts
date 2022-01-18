import { RequestMapping } from "microspringnode/decorators/RequestMapping";
import { Controller } from "microspringnode/decorators/Controller";
import { HttpMethod } from "microspringnode/constants/HttpMethods";
import { Log } from "microspringnode/index";
import { createShare, getAllShares} from "../services"
import { MimeType } from "microspringnode/constants/MimeTypes";
import { HttpStatusCode } from "microspringnode/constants/HttpStatus";

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