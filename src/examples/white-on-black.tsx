import { IExampleInfo } from "./interface";
import * as Pixi7 from "pixi.js";
import * as Pixi8 from "pixi-v8";
import { createEffect, createSignal, on } from "solid-js";
import { SwitchButton } from "../utils/switch-btn";

const test_text = "The quick brown fox jumps over the lazy dog. 01234567890_+-=/*()?;:";
let x = 175;

const [v8_mode, setV8Mode] = createSignal(1);

function ConstructV7()
{
    const root = new Pixi7.Container();

    const bg = root.addChild(new Pixi7.Graphics())
        .beginFill(0xffffff)
        .drawRect(0, 0, 400, 600)
        .endFill();

    let y = 80;
    for (let i = 0; i <= 20; i++)
    {
        const bright = 255 / 20 * i << 0;
        const tint = bright << 16 | bright << 8 | bright;

        const txt = new Pixi7.BitmapText(test_text, {
            fontSize: 14,
            fontName: "Open Sans",
            tint: tint
        });

        txt.position.set(x, y);
        y += 20;

        root.addChild(txt);
    }

    return root;
}

function ConstructV8()
{
    const root = new Pixi8.Container();

    const bg = new Pixi8.Graphics()
        .rect(0, 0, 400, 600)
        .fill(0xffffff);

    const lbl = [
        MakeV8Text(Pixi8.Text),
        MakeV8Text(Pixi8.BitmapText),
        MakeV8Text(Pixi8.HTMLText)
    ]

    root.addChild(bg, ...lbl);

    // Bind to switch
    createEffect(on(v8_mode, v =>
    {
        lbl.forEach((l, i) => l.visible = i === v);
        lbl[v].visible = true;
    }));

    return root;
}

function MakeV8Text(TEXT: any)
{
    let sub = new Pixi8.Container();
    sub.visible = false;

    const st = {
        fontFamily: "Open Sans",
        fontSize: 14,
        fill: 0xffffff
    }

    let y = 80;
    for (let i = 0; i <= 20; i++)
    {
        const bright = 255 / 20 * i << 0;
        const tint = bright << 16 | bright << 8 | bright;

        st.fill = tint;

        const txt = new TEXT({
            text: test_text,
            style: st,
            tint: 0xffffff
        });

        txt.position.set(x, y);
        y += 20;

        sub.addChild(txt);
    }

    return sub;
}

export function Controller()
{
    return <>
        <h4>V8 Text class:</h4>
        <div style={{
            display: "flex",
            gap: "4px",
            padding: "4px 0px"
        }}>
            <SwitchButton name="Text" cur={v8_mode() === 0} on_activate={() => setV8Mode(0)} />
            <SwitchButton name="BitmapText" cur={v8_mode() === 1} on_activate={() => setV8Mode(1)} />
            <SwitchButton name="HTMLText" cur={v8_mode() === 2} on_activate={() => setV8Mode(2)} />
        </div>
    </>
}

export function ExampleWhiteOnBlack(): IExampleInfo
{
    return {
        name: "Coverage: White on black",
        controller: Controller,
        description: () => <div>
            If text is white on black background, it will be thinner than black on white background.
            <br /><br />
            Text should maintain same thickness in both cases. Otherwise in dark themes it will be dimmer and less readable.
            <br /><br />
            ⚠ Note how it differs in V8 between Text|HTML vs BitmapText.<br />
            <br />
            Check my old PR: <a href="https://github.com/pixijs/pixijs/pull/9261">#9261</a> for more details...
        </div>,
        view_v7: ConstructV7(),
        view_v8: ConstructV8()
    }
}