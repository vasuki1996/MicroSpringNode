import { HttpMethod } from "../constants/HttpMethods";
import getDescriptors from 'object.getownpropertydescriptors';
import { EndpointDocumentation } from "../interface/EndpointDocumentation";

export const getRoutes = new Map<string, Function>();
export const postRoutes = new Map<string, Function>();
export const putRoutes = new Map<string, Function>();
export const deleteRoutes = new Map<string, Function>();
export const patchRoutes = new Map<string, Function>();

export const getRoutesDocs = new Map<string, EndpointDocumentation>();
export const postRoutesDocs = new Map<string, EndpointDocumentation>();
export const putRoutesDocs = new Map<string, EndpointDocumentation>();
export const deleteRoutesDocs = new Map<string, EndpointDocumentation>();
export const patchRoutesDocs = new Map<string, EndpointDocumentation>();

export const ControllerMap = new Map<string, Array<string>>();
export function RequestMapping(endpoint: string, method: HttpMethod, docs: EndpointDocumentation){
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
        switch(method){
            case HttpMethod.GET : getRoutes.set(endpoint, clazz[`${propertyKey}`]); getRoutesDocs.set(endpoint, docs); break;
            case HttpMethod.POST : postRoutes.set(endpoint, clazz[`${propertyKey}`]); postRoutesDocs.set(endpoint, docs); break;
            case HttpMethod.PUT : putRoutes.set(endpoint, clazz[`${propertyKey}`]); putRoutesDocs.set(endpoint, docs); break;
            case HttpMethod.DELETE : deleteRoutes.set(endpoint, clazz[`${propertyKey}`]); deleteRoutesDocs.set(endpoint, docs); break;
            case HttpMethod.PATCH : patchRoutes.set(endpoint, clazz[`${propertyKey}`]); patchRoutesDocs.set(endpoint, docs);break;
        }
    }
}
