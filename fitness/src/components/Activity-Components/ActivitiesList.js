import { getActivities } from "../../api/api";
import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import "./ActivitiesList.css"


const ActivitesList = () => {
    const [activites, setActivites] = useState([]);

    const handleActivites = () =>{
        getActivities()
        .then(results => {
            setActivites(results)
            console.log(results)
        });
    }

    useEffect(() =>{
        handleActivites();
    }, []);

    const ActivitiesList = activites.map((activity) =>{
       return <Activity activity={activity} />
    })

    return ( 
        <div className="activites-list">
        <h1>Activites</h1>
        {ActivitiesList}
        </div>
     );
}
 
export default ActivitesList;