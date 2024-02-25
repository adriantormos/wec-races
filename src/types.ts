export type RaceSummaryInfo = {
    eventInfo: RaceEventInfo,
    plotInfo: PlotInfoFromJSON,
    description: string,
    classification: RaceClassification
}
export type RaceEventInfo = {
    name: string,
    year: number,
    currentLap: number,
    totalLaps: number,
    elapsedTime: number
}
type PlotInfoFromJSON = {
    secondsPerLine: number,
    secondsPerLineIsLaps: boolean,
    amountOfLines: number,
    linesPerLap?: number
}
type RaceClassification = RaceEntryConfig[];
type RaceEntryConfig = {
    number: number,
    distance: number | string
}

export type URLPathInfo = {
    year: number,
    race: string,
    summaryNumber: number,
    maxSummaryNumber: number,
    canLinkLeft: boolean,
    canLinkRight: boolean
}

export type RaceClassificationProps = {
    eventInfo: RaceEventInfo,
    classification: RaceClassification
}

export type RacePlotProps = {
    plot: BasicPlotProps,
    race: RaceConfigProps
}
export type BasicPlotProps = PlotInfoFromJSON & {
    height: number,
    width: number,
    margin: number
}
type RaceConfigProps = {
    eventInfo: RaceEventInfo
    classification: RaceClassification
}