import st from "../app.module.scss";

export function DevTools(opt: { app: any; })
{
    return <button
        class={st.dev_tools_btn}
        onclick={() => (globalThis as any)['__PIXI_APP__'] = opt.app}
    >
        Dev Tools
    </button>;
}
