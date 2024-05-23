import { IExampleInfo } from "./interface";
import * as Pixi7 from "pixi.js";
import * as Pixi8 from "pixi-v8";
import { createEffect, createSignal, on } from "solid-js";

const [txt, setTxt] = createSignal("Hello World\nWhats up?\nSome\n\nmulti\n\nline\n\ntext\nhere!");

function ConstructV7()
{
    const root = new Pixi7.Container();

    const lbl = new Pixi7.BitmapText(txt(), {
        fontName: "JetBrains Mono",
        fontSize: 16,
        tint: 0xfafafa,
    });
    lbl.position.set(10, 10);

    root.addChild(lbl);

    // Bind to data
    createEffect(on(txt, str => lbl.text = str));

    return root;
}

function ConstructV8()
{
    const root = new Pixi8.Container();

    const lbl = new Pixi8.BitmapText({
        text: txt(),
        tint: 0xfafafa,
        position: { x: 10, y: 10 },
        style: {
            fontFamily: "JetBrains Mono",
            fontSize: 16,
            fill: 0xffffff
        },
    });

    root.addChild(lbl);

    // Bind to data
    createEffect(on(txt, str => lbl.text = str));

    return root;
}

export function ExampleMultiline(): IExampleInfo
{
    function TextED()
    {
        return <>
            <h4>Source text:</h4>
            <textarea
                style="width: 580px; height: 150px;"
                value={txt()}
                oninput={(e: InputEvent) => setTxt((e.target as HTMLTextAreaElement).value)}
            />
        </>
    }

    return {
        name: "Multiline text",
        description: () => "Empty lines shouldn't be skiped in V8",
        view_v7: ConstructV7(),
        view_v8: ConstructV8(),
        controller: TextED
    }
}