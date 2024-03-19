import "../raceSummary.css";
import {AllDataJSONs} from "../importAllJSONs";
import React from "react";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {useNavigate} from "react-router-dom";
import {FaChevronDown, FaChevronRight, FaCircle} from "react-icons/fa";


export function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className={'sidebar'}>
            <TreeView aria-label="race summary navigator"
                      defaultExpanded={[`year2023`, `year2024`]}
                      defaultCollapseIcon={<FaChevronDown size={"90%"} />}
                      defaultExpandIcon={<FaChevronRight size={"65%"} />}
                      defaultEndIcon={<FaCircle size={"40%"} />}
            >
                {Object.entries(AllDataJSONs)
                    .map(([year, year_data]) => (
                        <TreeItem nodeId={`year${year}`} label={`${year} season`}>
                            {Object.entries(year_data)
                                .map(([race, race_data], race_num) => {
                                    console.log([race, race_data]);
                                    return (
                                        <TreeItem nodeId={`year${year}-race${race}`}
                                                  label={year === '2023' ? `${race_data['Q'].eventInfo.name}` : `R${race_num + 1} - ${race_data['Q'].eventInfo.name}`}
                                                  onClick={() => navigate(`/wec-races/${year}/${race}/Q`)}/>
                                    )
                                })}
                        </TreeItem>
                    ))}
            </TreeView>
        </div>
    )
}