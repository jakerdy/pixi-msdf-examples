import { ParentProps } from "solid-js";
import st from "../app.module.scss";

interface ILabeledProps extends ParentProps
{
    label: string;
}
export function Labeled(props: ILabeledProps)
{
    return <div class={st.prop_lbl} >
        <span class={st.prop_title}>{props.label}</span>
        {props.children}
    </div>
}