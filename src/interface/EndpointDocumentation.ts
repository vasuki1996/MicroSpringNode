import { HttpStatusCode } from "../constants/HttpStatus";
import { MimeType } from "../constants/MimeTypes";

export interface EndpointDocumentation {
    tags?: string[],
    summary: string,
    operationId: string,
    requestBody?: RequestBody,
    responseBody: ResponseBody
}

interface RequestBody {
    description?: string,
    consumes: MimeType,
    requestSchemaDefName: string
    isArray?: boolean
}

interface ResponseBody {
    produces: MimeType,
    responses: [CaseResponse]
}

interface CaseResponse {
    status: HttpStatusCode,
    responseSchemaDefName: string,
    description?: string,
    isArray?: boolean
}