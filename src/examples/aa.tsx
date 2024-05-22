import { IExampleInfo } from "./interface";
import * as Pixi7 from "pixi.js";
import * as Pixi8 from "pixi-v8";


function ConstructV7()
{
    const root = new Pixi7.Container();

    const txt_1 = new Pixi7.BitmapText("1337", {
        fontName: "DSEG14Classic",
        fontSize: 128,
        tint: 0xffffff
    });

    const txt_2 = new Pixi7.BitmapText("1337", {
        fontName: "DSEG14Classic",
        fontSize: 128,
        tint: 0xff4545
    });

    const txt_3 = new Pixi7.BitmapText("1337", {
        fontName: "DSEG14Classic",
        fontSize: 128,
        tint: 0x45ff45
    });

    txt_1.position.set(10, 10);
    txt_2.position.set(10, 160);
    txt_3.position.set(10, 310);

    root.addChild(txt_1, txt_2, txt_3);

    return root;
}

function ConstructV8()
{
    const root = new Pixi8.Container();

    const st = {
        fontFamily: "DSEG14Classic",
        fontSize: 128,
        fill: 0xffffff
    };

    const txt_1 = new Pixi8.BitmapText({
        text: "1337",
        style: st,
        tint: 0xffffff
    });

    const txt_2 = new Pixi8.BitmapText({
        text: "1337",
        style: st,
        tint: 0xff4545
    });

    const txt_3 = new Pixi8.BitmapText({
        text: "1337",
        style: st,
        tint: 0x45ff45
    });

    txt_1.position.set(10, 10);
    txt_2.position.set(10, 160);
    txt_3.position.set(10, 310);

    root.addChild(txt_1, txt_2, txt_3);
    return root;
}

export function ExampleAA(): IExampleInfo
{
    return {
        name: "AA Edges",
        description: () => <>
            AA actualy works fine in both versions. The only difference is the way the edges are rendered.
            <br />
            Actual problem with AA is in <code>Zooming Issues</code> section.
            <br /><br />
            Though I will left it here for completeness, and proof that AA and Tints works fine.
        </>,
        view_v7: ConstructV7(),
        view_v8: ConstructV8()
    }
}