import React from "react";
import {RacePlot} from "./race/components/racePlot";
import "../raceSummary.css";
import {QualyClassificationTable} from "./classificationTable";
import parser from "bbcode-to-react";
import {QualyFromJSON, RaceClassification, RaceFromJSON, URLPathInfo} from "../types";
import {QualyStateTable} from "./qualyStateTable";

export type QualySummaryProps = QualyFromJSON & {
    URLPathInfo: URLPathInfo
}
export type RaceSummaryProps = RaceFromJSON & {
    URLPathInfo: URLPathInfo
}


export class QualyPageView extends React.Component<QualySummaryProps, any> {
    constructor(props: QualySummaryProps) {
        super(props);
    }

    render() {
        const classificationByHP: RaceClassification = [];
        this.props.classification.forEach(val => classificationByHP.push(Object.assign({}, val)));
        let classificationByQP: RaceClassification = [];
        this.props.classification.forEach(val => classificationByQP.push(Object.assign({}, val)));
        classificationByQP = classificationByQP
            .sort((a, b) => a.distance < b.distance ? -1 : 1);
        return (
            <div className={"content"}>
                <QualyStateTable {...this.props.eventInfo} {...this.props.URLPathInfo} />

                <div className={"race-plot-container"}>

                    <div style={{marginLeft: "20px", marginRight: "20px"}}>
                        <RacePlot plot={{
                            height: 600,
                            width: 300,
                            margin: 20,
                            ...this.props.plotInfo

                        }}
                                  race={{
                                      classification: classificationByQP,
                                      eventInfo: this.props.eventInfo
                                  }}/>
                    </div>

                    {this.props.eventInfo.hasHyperpole &&
                        <div style={{marginLeft: "-20px", marginRight: "20px"}}>
                            <RacePlot plot={{
                                height: 600,
                                width: 300,
                                margin: 20,
                                ...this.props.plotInfo
                            }}
                                      race={{
                                          classification: classificationByHP
                                              .filter((entry) => (entry.distanceHyperpole ?? false) || (entry.timeHyperpole ?? false))
                                              .map((entry) => ({
                                                  number: entry.number,
                                                  distance: entry.distanceHyperpole!!
                                              })),
                                          eventInfo: this.props.eventInfo
                                      }}/>
                        </div>
                    }

                    <div style={{margin: "20px",
                        minWidth: this.props.eventInfo.hasHyperpole ? 450 : 350,
                        maxWidth: this.props.eventInfo.hasHyperpole ? 450 : 350}}>
                        <QualyClassificationTable classification={classificationByHP}
                                                  eventInfo={this.props.eventInfo}
                        />
                    </div>

                    <div style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        textAlign: "justify",
                        width: "423px"
                    }}>
                        <p>{""}</p>
                    </div>

                </div>

            </div>
        )
    }
}