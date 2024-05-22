import { For, Show, createSignal, onMount } from "solid-js";

import st from "./app.module.scss";

import * as PixiV7 from "pixi.js";
import * as PixiV8 from "pixi-v8";

import { ExampleZoom } from "./examples/zooming";
import { ExampleMultiline } from "./examples/multiline";
import { ExampleWhiteOnBlack } from "./examples/white-on-black";
import { ExampleAA } from "./examples/aa";
import { InitPixi, apps } from "./utils/init-pixi";
import { IExampleInfo } from "./examples/interface";
import { SwitchButton } from "./utils/switch-btn";

export default function App()
{
    InitPixi();

    function LoadingView()
    {
        return <div class={st.loading}>
            Loading assets, and Pixi...
        </div>
    }

    return <div class={st.app}>
        <Show when={apps.ready()} fallback={LoadingView()}>
            <ExamplesView />
        </Show>
    </div>;
}


function ExamplesView()
{
    //------------------------------- State -------------------------------//
    const examples = [
        ExampleAA(),
        ExampleMultiline(),
        ExampleWhiteOnBlack(),
        ExampleZoom(),
    ];

    const [cur, setCur] = createSignal(examples[0]);

    // Init
    examples.forEach(InstllExample);
    SwitchTo(examples[0]);

    //------------------------------- Logics ------------------------------//
    function SwitchTo(ex: IExampleInfo)
    {
        cur().view_v7.visible = false;
        cur().view_v8.visible = false;

        setCur(ex);

        ex.view_v7.visible = true;
        ex.view_v8.visible = true;
    }

    function InstllExample(ex: IExampleInfo)
    {
        apps.v7.stage.addChild(ex.view_v7);
        ex.view_v7.visible = false;

        apps.v8.stage.addChild(ex.view_v8);
        ex.view_v8.visible = false;
    }

    //------------------------------- Views -------------------------------//
    function PixiView_V7()
    {
        let root!: HTMLDivElement;

        // Put Pixi view into DOM
        onMount(() => root.appendChild(apps.v7.renderer.view as HTMLCanvasElement));

        return <div class={st.viewport} ref={root}>
            <h4>Pixi Version: {PixiV7.VERSION}</h4>
            <DevTools app={apps.v7} />
        </div>
    }

    function PixiView_V8()
    {
        let root!: HTMLDivElement;

        // Put Pixi view into DOM
        onMount(() => root.appendChild(apps.v8.canvas));

        return <div class={st.viewport} ref={root}>
            <h4>Pixi Version: {PixiV8.VERSION}</h4>
            <DevTools app={apps.v8} />
        </div>
    }

    function Description()
    {
        return <div class={st.description}>
            <h4>Description:</h4>
            {cur().description()}
        </div>
    }

    function Controller()
    {

        return <Show when={cur().controller}>
            <div class={st.description}>
                {cur().controller!()}
            </div>
        </Show>;

    }

    return <div class={st.split_view}>
        <div class={st.tools}>
            <For each={examples}>{ex =>
                <SwitchButton name={ex.name} cur={ex === cur()} on_activate={() => SwitchTo(ex)} />}
            </For>
        </div>
        <div class={st.view}>
            <PixiView_V7 />
            <PixiView_V8 />
            <Controller />
            <Description />
        </div>
    </div>
}


function DevTools(opt: { app: any })
{
    return <button
        class={st.dev_tools_btn}
        onclick={() => (globalThis as any)['__PIXI_APP__'] = opt.app}
    >
        Dev Tools
    </button>
}