
/*

  Re-usable elements for the different classification tables

 */

import {QualyClassificationProps, RaceClassificationProps, RaceEntryConfig} from "../types";
import {CarInformation, Color} from "../utils";
import React from "react";
import Konva from "konva";
import enableTrace = Konva.enableTrace;

function secondsToMSFormat(totalTime: number) {
    let minutes = Math.floor((totalTime % 3600) / 60);
    let seconds = Math.floor(totalTime % 60);
    let decimals = seconds - Math.floor(seconds);
    return `${minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})}:${seconds.toLocaleString(undefined, {minimumIntegerDigits: 2})}.${decimals.toFixed(3)}`
}
function MSFormatToSeconds(totalTime: string) {
    let [minutes, seconds] = totalTime.split(':');
    return 60 * parseInt(minutes) + parseFloat(seconds);
}

export class QualyClassificationTable extends React.Component<QualyClassificationProps, any> {
    constructor(props: QualyClassificationProps) {
        super(props);
    }
    render() {
        // There should always be only one element in these lists
        let timeQP = this.props.classification
            .filter((entry) => (entry.time ?? false))
            .map((entry) => MSFormatToSeconds(entry.time!!))[0]
        let timeHP = this.props.classification
            .filter((entry) => (entry.timeHyperpole ?? false))
            .map((entry) => MSFormatToSeconds(entry.timeHyperpole!!))[0]

        return (
            <table className={'race-classification-table'}>
                <tbody>
                {this.props.classification
                    .map((entry, index) => (
                        <QualyClassificationRow eventYear={this.props.eventInfo.year} entry={entry} position={index+1}
                                                hyperpoleMode={this.props.eventInfo.hasHyperpole}
                                                timeQP={timeQP} timeHP={timeHP}
                        />
                        // <tr className={'race-classification-table-row'}>
                        //     <td style={{
                        //         width: "5px",
                        //         backgroundColor:
                        //             index === 0 ? "#eaaa31" :
                        //             index === 1 ? "#b9b9b9" :
                        //             index === 2 ? "#c96f34" :
                        //             index < 10 ? "#a5efa5" :
                        //             "#ffffff"
                        //     }} />
                        //     <td style={{
                        //         width: "25px",
                        //         paddingRight: "6px",
                        //         textAlign: "right"
                        //     }}>
                        //         {index + 1}
                        //     </td>
                        //     <td style={{
                        //         fontSize: entry.number >= 100 ? "9pt" : "11pt",
                        //         paddingLeft: "2px",
                        //         paddingRight: "2px",
                        //         backgroundColor: CarInformation[this.eventYear][entry.number].backgroundColor,
                        //         color: CarInformation[this.eventYear][entry.number].textColor,
                        //         textAlign: "center"
                        //     }}>
                        //         <b>{entry.number}</b>
                        //     </td>
                        //     <td style={{
                        //         width: "260px",
                        //         paddingLeft: "4px",
                        //         textAlign: "left"
                        //     }}>
                        //         {CarInformation[this.eventYear][entry.number].name}
                        //     </td>
                        //     {index >= 1 &&
                        //         <td style={{width: "80px", textAlign: "left"}}>
                        //             {"+"+(entry.distance as number).toFixed(1)+"s"}
                        //         </td>
                        //     }
                        // </tr>
                    ))}

                </tbody>
            </table>
        )
    }
}
export class RaceClassificationTable extends React.Component<RaceClassificationProps, any> {
    constructor(props: RaceClassificationProps) {
        super(props);
    }
    render() {
        return (
            <table className={'race-classification-table'}>
                <tbody>
                {/* Classified entries */}
                {this.props.classification
                    .filter((entry) => entry.distance !== "DNF" &&  entry.distance !== "DSQ")
                    .map((entry, index) => (
                        <RaceClassificationRow eventYear={this.props.eventInfo.year} entry={entry} position={index+1} />
                        // <tr className={'race-classification-table-row'}>
                        //     <td style={{
                        //         width: "5px",
                        //         backgroundColor:
                        //             index === 0 ? "#eaaa31" :
                        //             index === 1 ? "#b9b9b9" :
                        //             index === 2 ? "#c96f34" :
                        //             index < 10 ? "#a5efa5" :
                        //             "#ffffff"
                        //     }} />
                        //     <td style={{
                        //         width: "25px",
                        //         paddingRight: "6px",
                        //         textAlign: "right"
                        //     }}>
                        //         {index + 1}
                        //     </td>
                        //     <td style={{
                        //         fontSize: entry.number >= 100 ? "9pt" : "11pt",
                        //         paddingLeft: "2px",
                        //         paddingRight: "2px",
                        //         backgroundColor: CarInformation[this.eventYear][entry.number].backgroundColor,
                        //         color: CarInformation[this.eventYear][entry.number].textColor,
                        //         textAlign: "center"
                        //     }}>
                        //         <b>{entry.number}</b>
                        //     </td>
                        //     <td style={{
                        //         width: "260px",
                        //         paddingLeft: "4px",
                        //         textAlign: "left"
                        //     }}>
                        //         {CarInformation[this.eventYear][entry.number].name}
                        //     </td>
                        //     {index >= 1 &&
                        //         <td style={{width: "80px", textAlign: "left"}}>
                        //             {"+"+(entry.distance as number).toFixed(1)+"s"}
                        //         </td>
                        //     }
                        // </tr>
                    ))}

                {/* DNFs */}
                {this.props.classification
                    .filter((entry) => entry.distance === "DNF")
                    .map((entry) => (
                        <RaceClassificationRow eventYear={this.props.eventInfo.year} entry={entry} position={-1} />
                        // <tr className={'race-classification-table-row'}>
                        //     <td style={{
                        //         width: "5px",
                        //         backgroundColor: "#ffffff"}}
                        //     />
                        //     <td style={{
                        //         paddingRight: "4px",
                        //         textAlign: "center"
                        //     }}>
                        //         {"-"}
                        //     </td>
                        //     <td style={{
                        //         fontSize: entry.number >= 100 ? "9pt" : "11pt",
                        //         backgroundColor: CarInformation[this.eventYear][entry.number].backgroundColor,
                        //         color: CarInformation[this.eventYear][entry.number].textColor,
                        //         textAlign: "center"
                        //     }}>
                        //         <b>{entry.number}</b>
                        //     </td>
                        //     <td style={{
                        //         paddingLeft: "4px",
                        //         textAlign: "left"
                        //     }}>
                        //         {CarInformation[this.eventYear][entry.number].name}
                        //     </td>
                        //     <td style={{textAlign: "left"}}>{entry.distance}</td>
                        // </tr>
                    ))}

                {/* DSQs */}
                {this.props.classification
                    .filter((entry) => entry.distance === "DSQ")
                    .map((entry) => (
                        <RaceClassificationRow eventYear={this.props.eventInfo.year} entry={entry} position={-1} />
                        // <tr className={'race-classification-table-row'}>
                        //     <td style={{
                        //         width: "5px",
                        //         backgroundColor: "#ffffff"}}
                        //     />
                        //     <td style={{
                        //         paddingRight: "4px",
                        //         textAlign: "center"
                        //     }}>
                        //         {"-"}
                        //     </td>
                        //     <td style={{
                        //         fontSize: entry.number >= 100 ? "9pt" : "11pt",
                        //         backgroundColor: CarInformation[this.eventYear][entry.number].backgroundColor,
                        //         color: CarInformation[this.eventYear][entry.number].textColor,
                        //         textAlign: "center"
                        //     }}>
                        //         <b>{entry.number}</b>
                        //     </td>
                        //     <td style={{
                        //         paddingLeft: "4px",
                        //         textAlign: "left"
                        //     }}>
                        //         {CarInformation[this.eventYear][entry.number].name}
                        //     </td>
                        //     <td style={{textAlign: "left"}}>{entry.distance}</td>
                        // </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

export function QualyClassificationRow(props: { eventYear: number, entry: RaceEntryConfig , position: number, hyperpoleMode: boolean, timeQP: number, timeHP?: number }) {
    console.log(props);
    console.log(CarInformation[props.eventYear][props.entry.number]);

    let bestTimeIsQP = props.timeQP <= (props.timeHP ?? Infinity);

    return (
        <tr className={'race-classification-table-row'}>
            <ColoredPositionStripe position={props.position} onlyPodium={true}/>
            <td style={{width: "25px", paddingRight: "6px", textAlign: "right"}}>
                {props.position}
            </td>
            <ColoredEntryNumber number={props.entry.number}
                                textColor={CarInformation[props.eventYear][props.entry.number].textColor}
                                backgroundColor={CarInformation[props.eventYear][props.entry.number].backgroundColor}/>
            <td style={{width: "260px", paddingLeft: "4px", textAlign: "left"}}>
                {CarInformation[props.eventYear][props.entry.number].name}
            </td>

            {!props.hyperpoleMode && props.position === 1 &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {props.entry.time ?? ""}
                </td>
            }
            {!props.hyperpoleMode && props.position > 1 && typeof props.entry.distance === 'number' &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {"+" + (props.entry.distance as number).toFixed(3)+"s"}
                </td>
            }
            {!props.hyperpoleMode && props.position > 1 && props.entry.distance === 'No time' &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {props.entry.distance}
                </td>
            }
            {props.hyperpoleMode && props.entry.time &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {props.entry.time!!}
                </td>
            }
            {props.hyperpoleMode && !props.entry.time && typeof props.entry.distance === 'number' &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {bestTimeIsQP && ("+" + (props.entry.distance as number).toFixed(3)+"s")}
                    {/* !bestTimeIsQP implies props.timeHQ!! */}
                    {!bestTimeIsQP && ("+" + ((props.entry.distance as number) - (props.timeQP - props.timeHP!!)).toFixed(3)+"s")}
                </td>
            }
            {props.hyperpoleMode && props.entry.distance === 'No time' &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {props.entry.distance}
                </td>
            }

            {props.hyperpoleMode && props.entry.timeHyperpole &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {props.entry.timeHyperpole!!}
                </td>
            }
            {props.hyperpoleMode && !props.entry.timeHyperpole && props.entry.distanceHyperpole && !props.entry.timeHyperpole && typeof props.entry.distanceHyperpole === 'number' &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {bestTimeIsQP && ("+" + ((props.entry.distanceHyperpole as number) - (props.timeHP!! - props.timeQP)).toFixed(3)+"s")}
                    {!bestTimeIsQP && ("+" + (props.entry.distanceHyperpole as number).toFixed(3)+"s")}
                </td>
            }
            {props.hyperpoleMode && !props.entry.timeHyperpole && props.entry.distanceHyperpole && props.entry.distanceHyperpole === 'No time' &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {props.entry.distanceHyperpole}
                </td>
            }
        </tr>
    )
}

export function RaceClassificationRow(props: { eventYear: number, entry: RaceEntryConfig, position: number }) {
    return (
        <tr className={'race-classification-table-row'}>
            <ColoredPositionStripe position={props.position} onlyPodium={props.entry.distance === "DNF" || props.entry.distance === "DSQ"}/>
            <td style={{width: "25px", paddingRight: "6px", textAlign: "right"}}>
                {(props.entry.distance !== "DNF"  && props.entry.distance !== "DSQ") && props.position}
                {props.entry.distance === "DNF" && "-"}
                {props.entry.distance === "DSQ" && "-"}
            </td>
            <ColoredEntryNumber number={props.entry.number}
                                textColor={CarInformation[props.eventYear][props.entry.number].textColor}
                                backgroundColor={CarInformation[props.eventYear][props.entry.number].backgroundColor}/>
            <td style={{width: "260px", paddingLeft: "4px", textAlign: "left"}}>
                {CarInformation[props.eventYear][props.entry.number].name}
            </td>
            {props.entry.distance === "DNF" &&
                <td style={{textAlign: "left"}}>{"DNF"}</td>
            }
            {props.entry.distance === "DSQ" &&
                <td style={{textAlign: "left"}}>{"DSQ"}</td>
            }
            {props.entry.distance !== "DNF" && props.entry.distance !== "DSQ" && props.position > 1 &&
                <td style={{width: "80px", textAlign: "left"}}>
                    {"+" + (props.entry.distance as number).toFixed(1) + "s"}
                </td>
            }
        </tr>
    )
}

export function ColoredPositionStripe(props: { position: number, onlyPodium: boolean }) {
    return (
        <td style={{
            width: "5px",
            backgroundColor:
                props.position === 1 ? "#eaaa31" :
                props.position === 2 ? "#b9b9b9" :
                props.position === 3 ? "#c96f34" :
                (!props.onlyPodium && props.position <= 10) ? "#a5efa5" :
                "#ffffff"
        }}/>)
}

export function ColoredEntryNumber(props: { number: number, textColor: Color, backgroundColor: Color }) {
    return (
        <td style={{
            fontSize: props.number >= 100 ? "9pt" : "11pt",
            paddingLeft: "2px",
            paddingRight: "2px",
            backgroundColor: props.backgroundColor,
            color: props.textColor,
            textAlign: "center"
        }}>
            <b>{props.number}</b>
        </td>
    )
}