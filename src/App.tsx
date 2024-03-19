import React from 'react';
import './App.css';
import {RacePageView} from "./components/racePageView";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import {AllDataJSONs} from "./importAllJSONs";
import {Header} from "./components/header";
import {Sidebar} from "./components/sidebar";
import {PageView} from "./components/pageView";
import {QualyFromJSON, RaceFromJSON} from "./types";
import {QualyPageView} from "./components/qualyPageView";


function App() {
    const produceAllRoutes = () => {
        let allRoutes = [];
        for (const year in AllDataJSONs)
            for (const race in AllDataJSONs[year]) {
                for (const id in AllDataJSONs[year][race]) {
                    if (id === 'Q')
                        allRoutes.push(
                            <Route path={`/wec-races/${year}/${race}/Q`}
                                   element={<PageView pageContent={<QualyPageView {...AllDataJSONs[parseInt(year)][race][id] as QualyFromJSON}
                                                                                  URLPathInfo={{
                                                                                      year: parseInt(year),
                                                                                      race: race,
                                                                                      summaryNumber: 0,
                                                                                      maxSummaryNumber: Object.keys(AllDataJSONs[year][race]).length-1,
                                                                                      canLinkLeft: false,
                                                                                      canLinkRight: true
                                                                                  }}
                                   />} />} />);
                    else
                        allRoutes.push(
                            <Route path={`/wec-races/${year}/${race}/${id}`}
                                   element={<PageView pageContent={<RacePageView {...AllDataJSONs[parseInt(year)][race][parseInt(id)] as RaceFromJSON}
                                                                                 URLPathInfo={{
                                                                                    year: parseInt(year),
                                                                                    race: race,
                                                                                    summaryNumber: parseInt(id),
                                                                                    maxSummaryNumber: Object.keys(AllDataJSONs[year][race]).length-1,
                                                                                    canLinkLeft: true,
                                                                                    canLinkRight: parseInt(id) !== (Object.keys(AllDataJSONs[year][race]).length - 1)
                                                                                }} />} />} />
                        );
                    }
                }
        return allRoutes;
    };

  return (
      <HashRouter>
        <Routes>
            <Route path={'/wec-races'}
                   element={<PageView pageContent={<div />} />} />
            {produceAllRoutes()}
        </Routes>
      </HashRouter>
  );
}

export default App;
