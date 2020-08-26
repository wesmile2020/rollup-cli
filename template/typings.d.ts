declare module "*.glsl" {
    const content: string;
    export default content;
}

declare module "*.css"

declare module "*.png"

declare interface MapLike<T = any> {
    [k: string]: T;
}

type ArrayPoint = [number, number];

declare module "worker!*" {
    class WebWorker extends Worker {
        constructor();
    }

    export default WebWorker;
}
