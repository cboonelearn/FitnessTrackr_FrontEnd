import "./Activity.css"

const Activity = ({activity}) => {
    return ( 
        <div className="Activites">
            <h2>{activity.name}</h2>
            <p>{activity.description}</p>
        </div>
     );
}

export default Activity;
