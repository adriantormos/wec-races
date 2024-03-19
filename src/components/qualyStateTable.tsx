import React from "react";
import {Link} from "react-router-dom";
import {QualyEventInfo, URLPathInfo} from "../types";


export class QualyStateTable extends React.Component<QualyEventInfo & URLPathInfo, any>{
    constructor(props: QualyEventInfo & URLPathInfo) {
        super(props);
    }
    render() {

        return (
            <div style={{display: "flex"}}>

                {/* Race status */}
                <div style={{width: this.props.hasHyperpole ? 640 : 320, display: "block", marginTop: "20px", paddingLeft: "20px"}}>
                    <div style={{textAlign: "left", fontSize: "18pt"}}>{`${this.props.name}`}</div>
                        {this.props.hasHyperpole &&
                            <div style={{display: "flex"}}>
                                <div style={{width: "50%", textAlign: "left"}}>
                                    {"Qualifying"}
                                </div>
                                <div style={{width: "45%", textAlign: "left"}}>
                                    {"Hyperpole"}
                                </div>
                                {/*<div style={{width: "50%", textAlign: "right"}}>*/}
                                {/*</div>*/}
                            </div>
                        }
                        {!this.props.hasHyperpole &&
                            <div style={{display: "flex"}}>
                                <div style={{width: "50%", textAlign: "left"}}>
                                    {"Qualifying"}
                                </div>
                                <div style={{width: "50%", textAlign: "right"}}>
                                </div>
                            </div>
                        }
                </div>

                {/* Navigation (Previous/Next) */}
                <div style={{paddingTop: "30px", display: "flex", flexDirection: "row", flexGrow: 1}}>
                    <div style={{width: "45%", textAlign: "right"}}>
                        {/* Qualy should never link left */}
                    </div>
                    <div style={{width: "10%", textAlign: "center"}}>
                        {`Q/${this.props.maxSummaryNumber}`}
                    </div>
                    <div style={{width: "45%", textAlign: "left"}}>
                        {this.props.canLinkRight &&
                            <Link to={`/wec-races/${this.props.year}/${this.props.race}/${1}`}>
                                Next
                            </Link>}
                    </div>
                </div>
            </div>
        );
    }
}