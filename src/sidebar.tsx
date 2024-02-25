import "./raceSummary.css";
import {AllDataJSONs} from "./importAllJSONs";
import React from "react";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {useNavigate} from "react-router-dom";
import {FaChevronDown, FaChevronRight, FaCircle} from "react-icons/fa";


export function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className={'sidebar'}>
            <TreeView aria-label="race summary navigator"
                      defaultCollapseIcon={<FaChevronDown size={"90%"} />}
                      defaultExpandIcon={<FaChevronRight size={"65%"} />}
                      defaultEndIcon={<FaCircle size={"40%"} />}
            >
                {Object.entries(AllDataJSONs)
                    .map(([year, year_data]) => (
                        <TreeItem nodeId={`year${year}`} label={`${year} season`}>
                            {Object.entries(year_data)
                                .map(([race, race_data], race_num) => (
                                    <TreeItem nodeId={`year${year}-race${race}`}
                                              label={year === '2023' ? `${race_data[1].eventInfo.name}` : `R${race_num + 1} - ${race_data[1].eventInfo.name}`}
                                              onClick={() => navigate(`/wec-races/${year}/${race}/1`)} />
                                ))}
                        </TreeItem>
                    ))}
            </TreeView>
        </div>
    )
}