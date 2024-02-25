

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export function findLastOfIndex(array: Array<number>, element: number) {
    let elementToAccess = array.length-1;
    while(elementToAccess >= 0 && array[elementToAccess] !== element)
        elementToAccess--;
    return elementToAccess
}

export function range(n: number) {
    return Array.from(Array(n).keys())
}

type CarNameAndStyle = {
    backgroundColor: Color,
    textColor: Color,
    name: string
}
type CarInfoForSeason = Record<number, CarNameAndStyle>;

export const CarInformation : Record<number, CarInfoForSeason> = {
    2023: {
        '2':   {backgroundColor: "#0063d5", textColor: "#000000", name: "Cadillac Racing"},
        '3':   {backgroundColor: "#ffff00", textColor: "#000000", name: "Cadillac Racing"},
        '311': {backgroundColor: "#ff0000", textColor: "#000000", name: "Action Express Racing"},

        '4':   {backgroundColor: "#00ff00", textColor: "#000000", name: "Floyd Vanwall Racing Team"},

        '5':   {backgroundColor: "#ffffff", textColor: "#980000", name: "Porsche Penske Motorsport"},
        '6':   {backgroundColor: "#ffffff", textColor: "#980000", name: "Porsche Penske Motorsport"},
        '75':  {backgroundColor: "#ffffff", textColor: "#980000", name: "Porsche Penske Motorsport"},
        '38':  {backgroundColor: "#ffe599", textColor: "#000000", name: "Hertz Team Jota"},
        '99':  {backgroundColor: "#ffffff", textColor: "#1e1eff", name: "Proton Competition"},

        '7':   {backgroundColor: "#ffffff", textColor: "#ff0000", name: "Toyota Gazoo Racing"},
        '8':   {backgroundColor: "#ffffff", textColor: "#ff0000", name: "Toyota Gazoo Racing"},

        '50':  {backgroundColor: "#ff0000", textColor: "#ffff00", name: "Ferrari AF Corse"},
        '51':  {backgroundColor: "#ff0000", textColor: "#ffff00", name: "Ferrari AF Corse"},
        '83':  {backgroundColor: "#ff0000", textColor: "#ffffff", name: "AF Corse"},

        '93':  {backgroundColor: "#ffffff", textColor: "#1155cc", name: "Peugeot TotalEnergies"},
        '94':  {backgroundColor: "#ffffff", textColor: "#1155cc", name: "Peugeot TotalEnergies"},

        '708': {backgroundColor: "#05baf5", textColor: "#ffffff", name: "Glickenhaus Racing"},
        '709': {backgroundColor: "#05baf5", textColor: "#ffffff", name: "Glickenhaus Racing"}
    },
    2024: {
        '2':  {backgroundColor: "#0063d5", textColor: "#000000", name: "Cadillac Racing"},

        '5':  {backgroundColor: "#ffffff", textColor: "#980000", name: "Porsche Penske Motorsport"},
        '6':  {backgroundColor: "#ffffff", textColor: "#980000", name: "Porsche Penske Motorsport"},
        '12': {backgroundColor: "#ffe599", textColor: "#000000", name: "Hertz Team Jota"},
        '38': {backgroundColor: "#ffe599", textColor: "#000000", name: "Hertz Team Jota"},
        '99': {backgroundColor: "#ffffff", textColor: "#ff0000", name: "Proton Competition"},

        '7':  {backgroundColor: "#2f2f2f", textColor: "#ffffff", name: "Toyota Gazoo Racing"},
        '8':  {backgroundColor: "#2f2f2f", textColor: "#ffffff", name: "Toyota Gazoo Racing"},

        '11': {backgroundColor: "#ff0000", textColor: "#4a86e8", name: "Isotta Fraschini"},

        '15': {backgroundColor: "#ffffff", textColor: "#173a72", name: "BMW M Team WRT"},
        '20': {backgroundColor: "#ffffff", textColor: "#173a72", name: "BMW M Team WRT"},

        '35': {backgroundColor: "#0063d5", textColor: "#ffffff", name: "Alpine Endurance Team"},
        '36': {backgroundColor: "#0063d5", textColor: "#ffffff", name: "Alpine Endurance Team"},

        '50': {backgroundColor: "#ff0000", textColor: "#ffff00", name: "Ferrari AF Corse"},
        '51': {backgroundColor: "#ff0000", textColor: "#ffff00", name: "Ferrari AF Corse"},
        '83': {backgroundColor: "#ff0000", textColor: "#ffffff", name: "AF Corse"},

        '63': {backgroundColor: "#00ff00", textColor: "#000000", name: "Lamborghini Iron Lynx"},

        '93': {backgroundColor: "#ffffff", textColor: "#1155cc", name: "Peugeot TotalEnergies"},
        '94': {backgroundColor: "#ffffff", textColor: "#1155cc", name: "Peugeot TotalEnergies"}
    }
}