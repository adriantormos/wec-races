import React from 'react';
import './App.css';
import {RaceSummary} from "./raceSummary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AllDataJSONs} from "./importAllJSONs";
import {Header} from "./header";
import {Sidebar} from "./sidebar";


function App() {
    const produceAllRoutes = () => {
        let allRoutes = [];
        for (const year in AllDataJSONs)
            for (const race in AllDataJSONs[year])
                for (const id in AllDataJSONs[year][race])
                    allRoutes.push(
                        <Route path={`wec-races/${year}/${race}/${id}`} element={<RaceSummary {...AllDataJSONs[parseInt(year)][race][parseInt(id)]}
                                                                                              URLPathInfo={{
                                                                                                  year: parseInt(year),
                                                                                                  race: race,
                                                                                                  summaryNumber: parseInt(id),
                                                                                                  maxSummaryNumber: Object.keys(AllDataJSONs[year][race]).length,
                                                                                                  canLinkLeft: parseInt(id) !== 1,
                                                                                                  canLinkRight: parseInt(id) !== Object.keys(AllDataJSONs[year][race]).length
                                                                                              }} />} />
                    );
        return allRoutes;
    };

  return (
      <BrowserRouter>
        <Routes>
            <Route path={'wec-races'} element={(
                <div className="global">
                    <Header title={"adriantormos/wec-races"} />
                    <div className={'body-container'}>
                        <Sidebar />
                    </div>
                </div>
            )} />
            {produceAllRoutes()}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
