import {QualyFromJSON, RaceFromJSON} from './types';
import spa2023_Q from './data/2023/spa/Q.json';
import spa2023_1 from './data/2023/spa/1.json';
import spa2023_2 from './data/2023/spa/2.json';
import spa2023_3 from './data/2023/spa/3.json';
import spa2023_4 from './data/2023/spa/4.json';
import lemans2023_Q from './data/2023/lemans/Q.json';
import lemans2023_1 from './data/2023/lemans/1.json';
import lemans2023_2 from './data/2023/lemans/2.json';
import lemans2023_3 from './data/2023/lemans/3.json';
import lemans2023_4 from './data/2023/lemans/4.json';
import lemans2023_5 from './data/2023/lemans/5.json';
import lemans2023_6 from './data/2023/lemans/6.json';
import lemans2023_7 from './data/2023/lemans/7.json';
import monza2023_Q from './data/2023/monza/Q.json';
import monza2023_1 from './data/2023/monza/1.json';
import monza2023_2 from './data/2023/monza/2.json';
import monza2023_3 from './data/2023/monza/3.json';
import monza2023_4 from './data/2023/monza/4.json';
import qatar2024_Q from './data/2024/qatar/Q.json';
import qatar2024_1 from './data/2024/qatar/1.json';
import qatar2024_2 from './data/2024/qatar/2.json';
import qatar2024_3 from './data/2024/qatar/3.json';
import qatar2024_4 from './data/2024/qatar/4.json';
import qatar2024_5 from './data/2024/qatar/5.json';
import qatar2024_6 from './data/2024/qatar/6.json';
import qatar2024_7 from './data/2024/qatar/7.json';
import qatar2024_8 from './data/2024/qatar/8.json';


export const AllDataJSONs: Record<number, Record<string, Record<number | 'Q', QualyFromJSON | RaceFromJSON>>> = {
    2023: {
        'spa': {
            Q: spa2023_Q as QualyFromJSON,
            1: spa2023_1 as RaceFromJSON,
            2: spa2023_2 as RaceFromJSON,
            3: spa2023_3 as RaceFromJSON,
            4: spa2023_4 as RaceFromJSON,
        },
        'lemans': {
            Q: lemans2023_Q as QualyFromJSON,
            1: lemans2023_1 as RaceFromJSON,
            2: lemans2023_2 as RaceFromJSON,
            3: lemans2023_3 as RaceFromJSON,
            4: lemans2023_4 as RaceFromJSON,
            5: lemans2023_5 as RaceFromJSON,
            6: lemans2023_6 as RaceFromJSON,
            7: lemans2023_7 as RaceFromJSON,
        },
        'monza': {
            Q: monza2023_Q as QualyFromJSON,
            1: monza2023_1 as RaceFromJSON,
            2: monza2023_2 as RaceFromJSON,
            3: monza2023_3 as RaceFromJSON,
            4: monza2023_4 as RaceFromJSON,
        },
    },
    2024: {
        'qatar': {
            Q: qatar2024_Q as QualyFromJSON,
            1: qatar2024_1 as RaceFromJSON,
            2: qatar2024_2 as RaceFromJSON,
            3: qatar2024_3 as RaceFromJSON,
            4: qatar2024_4 as RaceFromJSON,
            5: qatar2024_5 as RaceFromJSON,
            6: qatar2024_6 as RaceFromJSON,
            7: qatar2024_7 as RaceFromJSON,
            8: qatar2024_8 as RaceFromJSON,
        },
    },
}
