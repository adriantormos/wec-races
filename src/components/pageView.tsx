import React from "react";
import {Header} from "./header";
import {Sidebar} from "./sidebar";


export function PageView(props: {pageContent: React.ReactElement}) {
    return (
        <div className="global">
            <Header title={"adriantormos/wec-races"}/>
            <div className={'body-container'}>
                <Sidebar/>
                {props.pageContent}
            </div>
        </div>
    )
}
