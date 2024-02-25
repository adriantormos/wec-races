import spa2023_1 from './data/2023/spa/1.json';
import spa2023_2 from './data/2023/spa/2.json';
import spa2023_3 from './data/2023/spa/3.json';
import spa2023_4 from './data/2023/spa/4.json';
import lemans2023_1 from './data/2023/lemans/1.json';
import lemans2023_2 from './data/2023/lemans/2.json';
import lemans2023_3 from './data/2023/lemans/3.json';
import lemans2023_4 from './data/2023/lemans/4.json';
import lemans2023_5 from './data/2023/lemans/5.json';
import lemans2023_6 from './data/2023/lemans/6.json';
import lemans2023_7 from './data/2023/lemans/7.json';
import monza2023_1 from './data/2023/monza/1.json';
import monza2023_2 from './data/2023/monza/2.json';
import monza2023_3 from './data/2023/monza/3.json';
import monza2023_4 from './data/2023/monza/4.json';
import {RaceSummaryInfo} from "./types";


export const AllDataJSONs: Record<number, Record<string, Record<number, RaceSummaryInfo>>> = {
    2023: {
        'spa': {
            1: spa2023_1,
            2: spa2023_2,
            3: spa2023_3,
            4: spa2023_4,
        },
        'lemans': {
            1: lemans2023_1,
            2: lemans2023_2,
            3: lemans2023_3,
            4: lemans2023_4,
            5: lemans2023_5,
            6: lemans2023_6,
            7: lemans2023_7,
        },
        'monza': {
            1: monza2023_1,
            2: monza2023_2,
            3: monza2023_3,
            4: monza2023_4,
        },
    }
}
