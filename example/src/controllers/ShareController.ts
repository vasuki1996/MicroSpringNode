import { RequestMapping } from "framework/decorators/RequestMapping";
import { Controller } from "framework/decorators/Controller";
import { HttpMethod } from "framework/constants/HttpMethods";
import { Log } from "framework/index";
import { createShare, getAllShares} from "../services"

@Controller()
export class ShareController{

    basePath = "/api/v1"

    @RequestMapping("/shares",HttpMethod.GET)
    getAllSharesController: Function = async (queries: any,params: any) => { 
        Log.debug("request", "Getting all the Share", { queries, params });
        return await getAllShares()
    }

    @RequestMapping("/create", HttpMethod.POST)
    createShareController: Function = async (request_body: any, queries: any,params: any) => {
        Log.debug("request", "Creating Share", { request_body, queries, params });
        return await createShare(request_body);
    }

}