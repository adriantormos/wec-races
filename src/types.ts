/* GENERAL */

type PlotInfoFromJSON = {
    secondsPerLine: number,
    secondsPerLineIsLaps: boolean,
    amountOfLines: number,
    linesPerLap?: number
}
export type URLPathInfo = {
    year: number,
    race: string,
    summaryNumber: number,
    maxSummaryNumber: number,
    canLinkLeft: boolean,
    canLinkRight: boolean
}

/* JSON TYPES */

export type QualyFromJSON = {
    eventInfo: QualyEventInfo,
    plotInfo: PlotInfoFromJSON,
    classification: RaceClassification
}
export type RaceFromJSON = {
    eventInfo: RaceEventInfo,
    plotInfo: PlotInfoFromJSON,
    description: string,
    classification: RaceClassification
}

/* EVENT GENERAL INFORMATION */

export type QualyEventInfo = {
    name: string,
    year: number,
    hasHyperpole: boolean
}
export type RaceEventInfo = QualyEventInfo & {
    currentLap: number,
    totalLaps: number,
    elapsedTime: number
}

/* EVENT CLASSIFICATION TABLES */

export type QualyClassificationProps = {
    eventInfo: QualyEventInfo,
    classification: RaceClassification
}
export type RaceClassificationProps = {
    eventInfo: RaceEventInfo,
    classification: RaceClassification
}
export type RaceClassification = RaceEntryConfig[];
export type RaceEntryConfig = {
    number: number,
    version?: string,
    distance: number | "DNF" | "DSQ" | "No time",
    distanceHyperpole?: number | "No time",
    time?: string,
    timeHyperpole?: string,
}

/* CLASSIFICATION PLOTS */

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
    eventInfo: QualyEventInfo | RaceEventInfo
    classification: RaceClassification
}