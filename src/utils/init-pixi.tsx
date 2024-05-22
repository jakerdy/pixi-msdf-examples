import { createSignal } from "solid-js";
import * as PixiV7 from "pixi.js";
import * as PixiV8 from "pixi-v8";


export async function InitPixi()
{
    const [ready, setReady] = createSignal(false);

    const pixi_opt = {
        width: 800,
        height: 600,
        antialias: true,
        background: 0
    };

    apps = {
        ready,
        v7: new PixiV7.Application(pixi_opt),
        v8: new PixiV8.Application()
    };

    await apps.v8.init(pixi_opt);


    await PixiV7.Assets.load("/msdf/JetBrainsMono-Regular.fnt");
    await PixiV7.Assets.load("/msdf/OpenSans-Regular.fnt");
    await PixiV7.Assets.load("/msdf/DSEG14Classic-Italic.fnt");

    await PixiV8.Assets.load("/msdf/JetBrainsMono-Regular.fnt");
    await PixiV8.Assets.load("/msdf/OpenSans-Regular.fnt");
    await PixiV8.Assets.load("/msdf/DSEG14Classic-Italic.fnt");

    setReady(true);
}

export let apps: {
    ready: () => boolean;
    v7: PixiV7.Application;
    v8: PixiV8.Application;
};
