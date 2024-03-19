import React from "react";
import {RacePlot} from "./race/components/racePlot";
import "../raceSummary.css";
import {RaceClassificationTable} from "./classificationTable";
import {RaceStateTable} from "./race/components/raceStateTable";
import parser from "bbcode-to-react";
import {RaceFromJSON, URLPathInfo} from "../types";

export type RaceSummaryProps = RaceFromJSON & {
    URLPathInfo: URLPathInfo
}


export class RacePageView extends React.Component<RaceSummaryProps, any> {
    constructor(props: RaceSummaryProps) {
        super(props);
    }

    render() {
        return (
            <div className={"content"}>
                <RaceStateTable {...this.props.eventInfo} {...this.props.URLPathInfo} />

                <div className={"race-plot-container"}>

                    <div style={{marginLeft: "20px", marginRight: "20px"}}>
                        <RacePlot plot={{
                            height: 600,
                            width: 300,
                            margin: 20,
                            ...this.props.plotInfo
                        }}
                                  race={{
                                      classification: this.props.classification,
                                      eventInfo: this.props.eventInfo
                                  }}/>
                    </div>

                    <div style={{margin: "20px", minWidth: 350, maxWidth: 350}}>
                        <RaceClassificationTable classification={this.props.classification}
                                                 eventInfo={this.props.eventInfo}/>
                    </div>

                    <div style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        textAlign: "justify",
                        maxWidth: "423px"
                    }}>
                        {this.props.description.split("\n" as string).map((line) =>
                            <p>{parser.toReact(line)}</p>)}
                    </div>

                </div>

            </div>
        )
    }
}