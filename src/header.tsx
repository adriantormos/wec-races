import React from "react";
import "./raceSummary.css";


export function Header(props: { title: string }) {
    return (
        <div className={'header'}>{props.title}
        </div>
    )
}