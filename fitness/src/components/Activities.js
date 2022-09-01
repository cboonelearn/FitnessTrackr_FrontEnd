import { getActivities } from "../api";
import React, { useEffect, useState } from "react";

const Activites = () => {
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
    
    return ( 
        <div className="Activites">
            <h1>Activites</h1>
            {activites.map((activity) =>{ return (<div key={activity.id}>
                <h2>{activity.name}</h2>
                <p>{activity.description}</p>
                </div>)
            })}
        </div>
     );
}

export default Activites;