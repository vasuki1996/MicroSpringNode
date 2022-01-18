export class ResponseEntity<Number, Object> {
    statusCode: number
    object: any

    constructor(statusCode: number, object: any){
        this.statusCode = statusCode;
        this.object - object;
    }
}