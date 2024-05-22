import st from "../app.module.scss";

//------------------------------- Utils -------------------------------//
interface SwitchButtonOpts
{
    name: string;
    cur?: boolean;
    on_activate: () => void;
}

export function SwitchButton(opt: SwitchButtonOpts)
{
    return <button
        data-cur={opt.cur}
        class={st.example_switcher}
        onclick={opt.on_activate}>
        {opt.name}
    </button>;
}
