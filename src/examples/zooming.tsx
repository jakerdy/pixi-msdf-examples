import { IExampleInfo } from "./interface";
import * as Pixi7 from "pixi.js";
import * as Pixi8 from "pixi-v8";
import dedent from "dedent";
import { ParentProps, createEffect, createSignal, on } from "solid-js";
import { Labeled } from "../utils/labeled";

const [zoom, setZoom] = createSignal(1);
const [showHeader, setShowHeader] = createSignal(true);
const [showBody, setShowBody] = createSignal(true);
const [before, setBefore] = createSignal(false);

function ZoomCTL()
{
    function OnChanged(e: InputEvent)
    {
        const val = parseFloat((e.target as HTMLInputElement).value);
        setZoom(val);
    }

    return <>
        <h4>Controls:</h4>
        <Labeled label="Zoom:">
            <input style="width:200px" type="range"
                min={0.01} max={10} step={0.01} value={zoom()}
                onInput={OnChanged} />
            <span>{zoom().toFixed(2)}x</span>
            <button onClick={() => setZoom(1)}> Reset</button>
        </Labeled>
        <Labeled label="Header:">
            <input type="checkbox" checked={showHeader()} onChange={e => setShowHeader(e.currentTarget.checked)} />
        </Labeled>
        <Labeled label="Contents:">
            <input type="checkbox" checked={showBody()} onChange={e => setShowBody(e.currentTarget.checked)} />
        </Labeled>
        <Labeled label="Label > Content">
            <input type="checkbox" checked={before()} onChange={e => setBefore(e.currentTarget.checked)} />
        </Labeled>
    </>;
}

function ConstructV7()
{
    const root = new Pixi7.Container();

    const rect = new Pixi7.Graphics().
        lineStyle(1, 0xff4545).
        drawRect(0, 0, 80, 50);

    const header = new Pixi7.BitmapText("Hello World", {
        fontName: "Open Sans",
        fontSize: 14,
        tint: 0xffffff
    });
    header.anchor.set(0, 1.25);

    const inner = new Pixi7.BitmapText("TRUE", {
        fontName: "DSEG14Classic",
        fontSize: 24,
        tint: 0xffbb54
    });
    inner.position.set(2, 2);

    root.addChild(rect, inner, header);
    root.position.set(100, 100);

    // React to zoom changes
    createEffect(on(zoom, z => 
    {
        root.scale.set(z);
        header.scale.set(1 / z);
    }));

    // Bind show/hide
    createEffect(() =>
    {
        header.visible = showHeader();
        inner.visible = showBody();
    });

    // Swap oder
    createEffect(on(before, b => 
    {
        root.removeChild(header);
        root.addChildAt(header, b ? 1 : 2);
    }));


    return root;
}

function ConstructV8()
{
    const root = new Pixi8.Container();
    root.position.set(100, 100);

    const rect = new Pixi8.Graphics().
        rect(0, 0, 80, 50).
        stroke(0xff4545);

    const header = new Pixi8.BitmapText({
        text: "Hello World",
        anchor: { x: 0, y: 1.25 },
        style: {
            fontFamily: "Open Sans",
            fontSize: 14,
            fill: 0xffffff
        }
    });

    const inner = new Pixi8.BitmapText({
        text: "TRUE",
        position: { x: 2, y: 2 },
        style: {
            fontFamily: "DSEG14Classic",
            fontSize: 24,
            fill: {
                color: 0xffbb54,
                alpha: 1
            }
        },
    });


    root.addChild(rect, header, inner);

    // React to zoom changes
    createEffect(on(zoom, z => 
    {
        root.scale.set(z);
        header.scale.set(1 / z);
    }));

    // Bind show/hide
    createEffect(() =>
    {
        header.visible = showHeader();
        inner.visible = showBody();
    });

    // Swap oder
    createEffect(on(before, b => 
    {
        root.removeChild(header);
        root.addChildAt(header, b ? 1 : 2);
    }));

    return root;
}


export function ExampleZoom(): IExampleInfo
{
    return {
        name: "Zooming issues",
        controller: ZoomCTL,
        description: () => <div>
            There is an issue with MSDF text when it scaled.
            <br /><br />
            In my case, I have some labels that maintains their pixel size, no matter how far or close user zoomed into scene.
            <br />
            <li>If zoom is 4x, then text label will have 1/4x scale.</li>
            <li>If zoom 1/8x, label will be 8x, and so on.</li>
            <br />
            After a little-bit of playing with zoom, I found that problem is way more complex than simple scaling.
            <br /><br />
            It seems that labels with different scales are interconnected is some way (batching?), and when there only one label, it's fine. But when there are two labels, they has some influence on to each other. Even worse it depends on order in which ther are added to the parent...
            <br />
        </div>,
        view_v7: ConstructV7(),
        view_v8: ConstructV8(),
    }
}