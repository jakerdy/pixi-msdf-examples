import * as Pixi7 from "pixi.js";
import * as Pixi8 from "pixi-v8";
import { JSXElement } from "solid-js";

export interface IExampleInfo
{
    name: string;
    view_v7: Pixi7.Container;
    view_v8: Pixi8.Container;
    description: () => JSXElement;
    controller?: () => JSXElement;
}