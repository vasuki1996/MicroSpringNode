import { RequestMapping } from "framework/decorators/RequestMapping";
import { Controller } from "framework/decorators/Controller";
import { HttpMethod } from "framework/constants/HttpMethods";
import { Log } from "framework/index";

@Controller()
export class TestController{

    basePath = "/test"

    @RequestMapping("/test123",HttpMethod.GET)
    testcall: Function = (queries: any,params: any) => { 
        return {params, queries }
    }

    @RequestMapping("/test12",HttpMethod.GET)
    testcall1: Function = (queries: any,params: any) => { 
        return {params, queries }
    }

    @RequestMapping("/post", HttpMethod.POST)
    postcall: Function = (request_body: any, queries: any,params: any) => {
        Log.debug("test", "test", { request_body, queries, params })
        return { request_body, queries, params }
    }

}
