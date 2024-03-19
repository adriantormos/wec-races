import React from "react";
import {Link} from "react-router-dom";
import {RaceEventInfo, URLPathInfo} from "../../../types";


export class RaceStateTable extends React.Component<RaceEventInfo & URLPathInfo, any>{
    constructor(props: RaceEventInfo & URLPathInfo) {
        super(props);
    }

    secondsToHMSFormat(totalTime: number) {
        let hours = Math.floor(totalTime / 3600);
        let minutes = Math.floor((totalTime % 3600) / 60);
        let seconds = Math.floor(totalTime % 60);
        return hours.toString()
            + ":" + minutes.toLocaleString(undefined, {minimumIntegerDigits: 2}).toString()
            + ":" + seconds.toLocaleString(undefined, {minimumIntegerDigits: 2}).toString();
    }

    render() {

        return (
            <div style={{display: "flex"}}>

                {/* Race status */}
                <div style={{width: 320, display: "block", marginTop: "20px", paddingLeft: "20px"}}>
                    <div style={{textAlign: "left", fontSize: "18pt"}}>{`${this.props.name}`}</div>
                    <div style={{display: "flex"}}>
                        <div style={{width: "50%", textAlign: "left"}}>
                            {this.props.currentLap === this.props.totalLaps &&
                                "Finish"}
                            {this.props.currentLap !== this.props.totalLaps &&
                                "Lap " + this.props.currentLap.toString() + "/" + this.props.totalLaps.toString()}
                        </div>
                        <div style={{width: "50%", textAlign: "right"}}>
                            {this.secondsToHMSFormat(this.props.elapsedTime)}
                        </div>
                    </div>
                </div>

                {/* Navigation (Previous/Next) */}
                <div style={{paddingTop: "30px", paddingLeft: "60px", display: "flex", flexDirection: "row", flexGrow: 1}}>
                    <div style={{width: "45%", textAlign: "right"}}>
                        {this.props.canLinkLeft && this.props.summaryNumber === 1 &&
                            <Link className={"previous-next-link"} to={`/wec-races/${this.props.year}/${this.props.race}/Q`}>
                                Previous
                            </Link>}
                        {this.props.canLinkLeft && this.props.summaryNumber !== 1 &&
                            <Link className={"previous-next-link"} to={`/wec-races/${this.props.year}/${this.props.race}/${this.props.summaryNumber-1}`}>
                                Previous
                            </Link>}
                    </div>
                    <div style={{width: "10%", textAlign: "center"}}>
                        {`${this.props.summaryNumber}/${this.props.maxSummaryNumber}`}
                    </div>
                    <div style={{width: "45%", textAlign: "left"}}>
                        {this.props.canLinkRight &&
                            <Link className={"previous-next-link"} to={`/wec-races/${this.props.year}/${this.props.race}/${this.props.summaryNumber+1}`}>
                                Next
                            </Link>}
                    </div>
                </div>
            </div>
        );
    }
}