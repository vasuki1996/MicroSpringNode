import { HttpMethod } from "../constants/HttpMethods";
import getDescriptors from 'object.getownpropertydescriptors';

export const getRoutes = new Map<string, Function>();
export const postRoutes = new Map<string, Function>();
export const putRoutes = new Map<string, Function>();
export const deleteRoutes = new Map<string, Function>();
export const patchRoutes = new Map<string, Function>();

export const ControllerMap = new Map<string, Array<string>>();
export function RequestMapping(endpoint: string, method: HttpMethod){
    return <any>function (target: any, propertyKey: string, descriptor: any) {
        descriptor = getDescriptors(target);
        console.debug("----target----");
        console.debug(target);
        console.debug("----property key----");
        console.debug(propertyKey);
        console.debug("----descriptors----");
        console.debug(descriptor);
        let clazz = new descriptor.constructor.value();
        console.log(Object.keys(clazz));
        endpoint = clazz.basePath ? clazz.basePath + endpoint : endpoint;
        console.debug("----endpoint----");
        console.debug(endpoint);
        // if(ControllerMap.get(descriptor.name.value)){
        //     let arr = ControllerMap.get(descriptor.name.value);
        //     arr.push(`${method}|${endpoint}|${propertyKey}`);
        // } else {
        //     ControllerMap.set(descriptor.name.value, [`${method}|${endpoint}|${propertyKey}`])
        // }
        // switch(method){
        //     case HttpMethod.GET : getRoutes.set(endpoint, descriptor[`${propertyKey}`]["value"]); break;
        //     case HttpMethod.POST : postRoutes.set(endpoint, descriptor[`${propertyKey}`]["value"]); break;
        //     case HttpMethod.PUT : putRoutes.set(endpoint, descriptor[`${propertyKey}`]["value"]); break;
        //     case HttpMethod.DELETE : deleteRoutes.set(endpoint, descriptor[`${propertyKey}`]["value"]); break;
        //     case HttpMethod.PATCH : patchRoutes.set(endpoint, descriptor[`${propertyKey}`]["value"]); break;
        // }
        switch(method){
            case HttpMethod.GET : getRoutes.set(endpoint, clazz[`${propertyKey}`]); break;
            case HttpMethod.POST : postRoutes.set(endpoint, clazz[`${propertyKey}`]); break;
            case HttpMethod.PUT : putRoutes.set(endpoint, clazz[`${propertyKey}`]); break;
            case HttpMethod.DELETE : deleteRoutes.set(endpoint, clazz[`${propertyKey}`]); break;
            case HttpMethod.PATCH : patchRoutes.set(endpoint, clazz[`${propertyKey}`]); break;
        }
    }
}
