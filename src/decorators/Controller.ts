export function Controller(basePath?: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        console.debug("BUILDING CONTROLLER");
        return class extends constructor {
            [x: string]: any;
            basePath = basePath ? basePath : "/";
            className = this.name;
        }
    }
}