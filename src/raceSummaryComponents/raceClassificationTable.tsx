import React from "react";
import {CarInformation} from "../utils";
import {RaceClassificationProps} from "../types";


export class RaceClassificationTable extends React.Component<RaceClassificationProps, any> {
    private eventYear: number;
    constructor(props: RaceClassificationProps) {
        super(props);
        this.eventYear = props.eventInfo.year;
    }
    render() {
        return (
            <table className={'race-classification-table'}>
                <tbody>
                {/* Classified entries */}
                {this.props.classification
                    .filter((entry) => entry.distance !== "DNF")
                    .map((entry, index) => (
                        <tr className={'race-classification-table-row'}>
                            <td style={{
                                width: "5px",
                                backgroundColor:
                                    index === 0 ? "#eaaa31" :
                                    index === 1 ? "#b9b9b9" :
                                    index === 2 ? "#c96f34" :
                                    index < 10 ? "#a5efa5" :
                                    "#ffffff"
                            }} />
                            <td style={{
                                width: "25px",
                                paddingRight: "6px",
                                textAlign: "right"
                            }}>
                                {index + 1}
                            </td>
                            <td style={{
                                fontSize: entry.number >= 100 ? "9pt" : "11pt",
                                paddingLeft: "2px",
                                paddingRight: "2px",
                                backgroundColor: CarInformation[this.eventYear][entry.number].backgroundColor,
                                color: CarInformation[this.eventYear][entry.number].textColor,
                                textAlign: "center"
                            }}>
                                <b>{entry.number}</b>
                            </td>
                            <td style={{
                                width: "260px",
                                paddingLeft: "4px",
                                textAlign: "left"
                            }}>
                                {CarInformation[this.eventYear][entry.number].name}
                            </td>
                            {index >= 1 &&
                                <td style={{width: "80px", textAlign: "left"}}>
                                    {"+"+(entry.distance as number).toFixed(1)+"s"}
                                </td>
                            }
                        </tr>
                    ))}

                {/* DNFs */}
                {this.props.classification
                    .filter((entry) => entry.distance === "DNF")
                    .map((entry) => (
                        <tr className={'race-classification-table-row'}>
                            <td style={{
                                width: "5px",
                                backgroundColor: "#ffffff"}}
                            />
                            <td style={{
                                paddingRight: "4px",
                                textAlign: "center"
                            }}>
                                {"-"}
                            </td>
                            <td style={{
                                fontSize: entry.number >= 100 ? "9pt" : "11pt",
                                backgroundColor: CarInformation[this.eventYear][entry.number].backgroundColor,
                                color: CarInformation[this.eventYear][entry.number].textColor,
                                textAlign: "center"
                            }}>
                                <b>{entry.number}</b>
                            </td>
                            <td style={{
                                paddingLeft: "4px",
                                textAlign: "left"
                            }}>
                                {CarInformation[this.eventYear][entry.number].name}
                            </td>
                            <td style={{textAlign: "left"}}>{entry.distance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}