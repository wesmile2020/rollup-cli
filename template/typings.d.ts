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

declare namespace GeoJSON {
    type Position = ArrayPoint;

    interface Feature {
        type: 'Feature';
        properties: MapLike | null;
    }

    interface Point<T = Position> {
        type: 'Point';
        coordinates: T;
    }

    interface MultiPoint<T = Position> {
        type: 'MultiPoint';
        coordinates: T[];
    }

    interface FeaturePoint<T = Position> {
        type: 'Feature';
        geometry: Point<T> | MultiPoint<T>;
        properties: MapLike | null;
    }

    interface LineString<T = Position> {
        type: 'LineString';
        coordinates: T[]
    }

    interface MultiLineString<T = Position> {
        type: 'MultiLineString';
        coordinates: T[][];
    }

    interface FeatureLineString<T = Position> {
        type: 'Feature';
        geometry: LineString<T> | MultiLineString<T>;
        properties: MapLike | null;
    }

    interface Polygon {
        type: 'Polygon';
        coordinates: Position[][];
    }

    interface MultiPolygon {
        type: 'MultiPolygon';
        coordinates: Position[][][];
    }

    interface FeaturePolygon {
        type: 'Feature';
        geometry: Polygon | MultiPolygon;
        properties: MapLike | null;
    }
}

declare interface PlanarGraph {
    frame: {
        type: 'FeatureCollection';
        features: GeoJSON.FeaturePolygon[] | null;
    }
    area: {
        type: 'FeatureCollection';
        features: GeoJSON.FeaturePolygon[] | null;
    }
    shop?: {
        type: 'FeatureCollection';
        features: GeoJSON.FeaturePolygon[] | null;
    }
    facility: {
        type: 'FeatureCollection';
        features: GeoJSON.FeaturePoint[] | null;
    }
}

declare interface ParsedPlanarGraph {
    frame: GeoJSON.FeaturePolygon[];
    area: GeoJSON.FeaturePolygon[];
    shop: GeoJSON.FeaturePolygon[];
    facility: GeoJSON.FeaturePoint[];
}

declare type Anchor = 'top' | 'center' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'right' | 'left';

declare type ControlPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

declare interface FloorItem {
    altitude: number;
    bdId: string;
    bounds: number[][];
    center: {
        type: 'Point';
        coordinates: number[]
    };
    defaultFloor: boolean;
    flId: string;
    floorAddress: string;
    mapId: string;
    name: string;
    nameEn: string;
}

declare module "worker!*" {
    class WebWorker extends Worker {
        constructor();
    }

    export default WebWorker;
}

declare interface Bounds {
    topLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
}

declare interface Coordinate {
    x: number;
    y: number;
}

declare interface Positions {
    floorId: string;
    coordinate: Coordinate;
}

declare type Direction = 'leftRear' | 'left' | 'leftFront' | 'straight' |
    'rightFront' | 'right' | 'rightRear' | 'top' | 'bottom';

declare type FontWeight = 'bold' | 'normal' | number;
