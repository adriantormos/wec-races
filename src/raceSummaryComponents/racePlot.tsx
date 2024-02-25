import {Image, Layer, Line, Stage, Text, Label, Tag,} from "react-konva";
import React from "react";
import "../raceSummary.css";
import useImage from "use-image";


import {findLastOfIndex, range} from "../utils";
import {BasicPlotProps, RacePlotProps} from "../types";

export function RacePlotBackgroundLine(props: {from: [number, number], to: [number, number]}) {
    return (
        <Line stroke={'gray'}
              points={[props.from[0], props.from[1], props.to[0], props.to[1]]}
        />
    )
}
export function RacePlotDistanceLabel(props: {position: [number, number], text: string}) {
    return (
        <Text x={props.position[0]} y={props.position[1]} width={40} align={"right"} verticalAlign={"center"}
              text={props.text}
        />
    )
}

export function CarImage(props: {position: [number, number], image: string}) {
    const [image, _] = useImage(props.image);

    return (
        <Image image={image}
               x={props.position[0]} y={props.position[1]}
               scaleX={1} scaleY={1}
        />
    );
}


export class RacePlot extends React.Component<RacePlotProps, { tooltipStates: {text: string, position: [number, number]}[] } > {
    private readonly raceCarAreaHeight: number;
    private readonly carImages: Record<number, Record<number, string>>;  // 1st key - year/season; 2nd key - #car

    constructor(props: RacePlotProps) {
        super(props);
        this.raceCarAreaHeight = this.props.plot.height - 2 * this.props.plot.margin;

        this.carImages = {};
        this.preLoadAllCarSprites();

        this.state = {
            tooltipStates: props.race.classification
                .map(() => ({text: "", position: [0, 0]}))
        }
    }

    preLoadAllCarSprites() {
        const images = require.context('../imgs/', true);
        // const images = require.context('../imgs/2023', true);

        for (const key of images.keys()) {
            let matches = key.match(/(\d+)/g) ?? -1;
            if (typeof matches === "number")
                this.carImages[matches] = images(key);
            else {
                if (!(matches[0] in this.carImages))
                    this.carImages[parseInt(matches[0])] = {}
                this.carImages[parseInt(matches[0])][parseInt(matches[1])] = images(key);
            }
        }
    }

    getLineHeights() {
        let amountOfLines = this.props.plot.amountOfLines;
        return range(amountOfLines)
            .map((n) => n / (amountOfLines - 1))
            .map((n) => n * (this.raceCarAreaHeight))
    }

    getCarHeights() {
        let pixelsBetweenLines = this.raceCarAreaHeight / (this.props.plot.amountOfLines-1);
        return this.props.race.classification
            .filter((entry) => entry.distance !== "DNF")
            .map((entry) => (entry.distance as number) * (pixelsBetweenLines / this.props.plot.secondsPerLine))
    }

    getCarPositions() {
        let carHeights = this.getCarHeights();
        const carHeightInPixels = 60;
        const carWidthInPixels = 28;
        let currentColumn = 0;
        let carColumns = [];
        for (let index = 0; index < carHeights.length; index++) {
            if (carColumns.length === 0) {}
            else if (carHeights[index] - carHeights[index-1] > carHeightInPixels)
                currentColumn = 0;
            else {
                let candidateColumn = 0;
                let elementIndexToCompare = findLastOfIndex(carColumns, candidateColumn)
                while (elementIndexToCompare !== -1 && carHeights[index] - carHeights[elementIndexToCompare] <= carHeightInPixels) {
                    candidateColumn++;
                    elementIndexToCompare = findLastOfIndex(carColumns, candidateColumn)
                }
                currentColumn = candidateColumn;
            }
            carColumns.push(currentColumn);
        }
        return carColumns
            .map((column) => column%2 === 0 ? column/2 : -Math.ceil(column/2))
            .map((column, index) => [this.props.plot.width/2 + column * (carWidthInPixels + 8), carHeights[index]]);

    }

    render() {
        let plotConfig: BasicPlotProps = this.props.plot;
        let lineHeights = this.getLineHeights();
        let carPositions = this.getCarPositions();

        return (
            <Stage width={plotConfig.width} height={plotConfig.height} className={'race-plot'}>
                {/* Background lines */}
                <Layer x={0} y={20} width={plotConfig.width} height={this.raceCarAreaHeight}>
                    {lineHeights.map((height) =>
                        <RacePlotBackgroundLine from={[40, height]} to={[plotConfig.width - plotConfig.margin, height]} />
                    )}
                </Layer>

                {/* Y-axis labels (seconds/laps) */}
                <Layer x={0} y={20} width={plotConfig.width - 40} height={this.raceCarAreaHeight}>
                    {this.props.plot.secondsPerLineIsLaps &&
                        lineHeights.map((height, index) => {
                            let linesPerLap = this.props.plot.linesPerLap ?? 1;
                            let lapNumberForThisLine = Math.floor(index / (this.props.plot.linesPerLap ?? 1));
                            return (
                                <div>
                                    {index % linesPerLap === 0 && index > 0 &&
                                        <RacePlotDistanceLabel position={[0, height - 5]}
                                                               text={"+" + lapNumberForThisLine.toString() + (lapNumberForThisLine >= 10 ? " ls." : " lap") + (lapNumberForThisLine >= 10 ? "" : lapNumberForThisLine > 1 ? "s" : "")} />}
                                    {index % linesPerLap === 0 && index === 0 &&
                                        <RacePlotDistanceLabel position={[0, height - 5]}
                                                               text={"+0s"} />}
                                    {index % linesPerLap !== 0 &&
                                        <RacePlotDistanceLabel position={[0, height-5]}
                                                               text={"+"+(plotConfig.secondsPerLine * index).toString()+"s"} />}
                                </div>
                            );
                        })
                    }
                    {!this.props.plot.secondsPerLineIsLaps &&
                        lineHeights.map((height, index) =>
                        <RacePlotDistanceLabel position={[-5, height-5]} text={"+"+(plotConfig.secondsPerLine * index).toString()+"s"} />
                    )}
                </Layer>

                {/* Cars */}
                <Layer x={0} y={0}>
                    {carPositions
                        .map(([x, y], index) =>
                            <div onMouseEnter={() => {
                                     this.setState({
                                         tooltipStates: this.state.tooltipStates
                                             .map((element, stateIndex) =>
                                                 index === stateIndex ? {text: "#" + this.props.race.classification[index].number.toString() + " (+" + (this.props.race.classification[index].distance as number).toFixed(1) + "s)", position: [x+30, (plotConfig.margin + y) + 30]} : element)
                                     })
                                 }}
                                 onMouseLeave={() => {
                                     this.setState({
                                         tooltipStates: this.state.tooltipStates
                                             .map((element, stateIndex) =>
                                                 index === stateIndex ? {text: "", position: element.position} : element)
                                         })
                                 }} >
                                <CarImage position={[x, plotConfig.margin + y]}
                                          image={this.carImages[this.props.race.eventInfo.year][this.props.race.classification[index].number]} />
                            </div>
                        )}
                    {carPositions
                        .map(([], index) =>
                            <div>
                                {
                                    this.state.tooltipStates[index].text &&
                                    <Label x={this.state.tooltipStates[index].position[0]} y={this.state.tooltipStates[index].position[1]} >
                                        <Tag fill={"white"}
                                             pointerDirection={"left"}
                                             lineJoin={"round"}
                                             opacity={0.90} />
                                        <Text text={this.state.tooltipStates[index].text}
                                              fontFamily={"Lato"} opacity={1} fontSize={14} fill={"black"}
                                              padding={2} />
                                    </Label>
                                }
                            </div>
                        )
                    }
                </Layer>
            </Stage>
        )
    }
}