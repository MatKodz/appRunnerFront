import { useState, useEffect } from "react";
import iconClock from './assets/img/icon-clock.png';
import iconRuler from './assets/img/icon-ruler.png';
import iconUp from './assets/img/icon-up.png';
import iconTrash from './assets/img/icon-trash.png';
import Navbar from "./Navbar";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { config } from "../env/Configuration";

const convertTimetoHours = (stringTime) => {
    if(!stringTime) return
    let [h,m,s] = stringTime.split(":")
    m = (+m + s/60) / 60
    return (+h + m)
}
 
 const Run = ({details,removeRun}) => {

    const dateString = new Date(details.date).toLocaleDateString('fr-US', { year:"numeric", month:"numeric", day:"numeric", hour:"numeric", minute:"numeric"})
    
    return <div className="grid m-3 align-items-center border-bottom-3 border-blue-200">
        <h3 className="color-blue-100 p-1 run-id">#{details.id}</h3>
        <div className="col run-date">{dateString}</div>
        <time className="col run-duration"> <img src={iconClock} alt="" /> {details.duree} </time>
        <div className="col run-length font-bold">
        <img src={iconRuler} alt="" /> {details.distance}km
        </div>
        <div className="font-bold col">
        <img src={iconUp} alt="" /> {details.denivelle}m
        </div>
        <div className="col">
            Moy. : <strong>{(details.distance / convertTimetoHours(details.duree)).toFixed(1)} km/h </strong>
        </div>
        <div className="col">
            {details.lieu}
        </div>
        <div className="col">
            Par {details.pseudonyme}({details.fk_profil})
        </div>
        <div className="col">
            <button onClick={() => removeRun(details.id)}><img src={iconTrash} alt="" /></button>
        </div>
    </div>
 }

 const Runs = () => {
    const runsInit = [
        {
        "id" : 2,
        "date": "2024-09-02 11:00:00.000",
        "duree": "00:30:40",
        "distance": 9,
        "denivelle": 9,
        "lieu": "Montpellier",
        "fk_profil": 1
    },
    {
        "id" : 3,
        "date": "2024-09-09 18:13:00.000",
        "duree": "00:58:23",
        "distance": 8,
        "denivelle": 8,
        "lieu": "Montpellier",
        "fk_profil": 2
    }
    ];
    const [runsDetails,setRunsDetails] = useState(runsInit);
    const [orderByType,setOrderByType] = useState("oldest");

    const orderBy = () => {
        let tempRuns = [];
        if(orderByType == "oldest" ) {
            tempRuns = [...runsDetails].sort(function(a,b) {
                return new Date(b.date) - new Date(a.date);  
            });
            setOrderByType("latest");
        }
        else {
            tempRuns = [...runsDetails].sort(function(a,b) {
                return new Date(a.date) - new Date(b.date);  
            });
            setOrderByType("oldest");
        }

        setRunsDetails(tempRuns);
    }

    const removeRun = (id) => {
        let options = {
            method: "DELETE",
            body: JSON.stringify({id}),
            headers: {
                "Content-Type": "application/json",
              }
        }
        fetch(config.url.API_URL + "/removeRun",options)
        .then( rep => rep.json())
        .then (json => {
            console.log(json.message)
            if(json.message) {
                setRunsDetails([...runsDetails].filter( run => run.id !== id))
            }
                
        })
        .catch ( e => console.log(e))
    }

    useEffect(() => {
        fetch(config.url.API_URL + "/runs")
        .then(rep => rep.json())
        .then( data => setRunsDetails(data))
    },[])

    return <>
            <Navbar/>
            <main>
            <div className="grid m-3 align-items-center bg-blue-200">
                <h3 className="color-blue-100 p-1 run-id">#</h3>
                <div className="col run-date-reorder" onClick={orderBy}>Date (reorder)</div>
                <time className="col"> <img src={iconClock} alt="" /> Durée </time>
                <div className="col">
                <img src={iconRuler} alt="" /> Distance 
                </div>
                <div className="col">
                <img src={iconUp} alt="" /> Dénivellé 
                </div>
                <div className="col">
                    Moyenne
                </div>
                <div className="col">
                    Lieu
                </div>
                <div className="col">
                    Profil
                </div>
                <div className="col">
                    
                </div>
            </div>
            <TransitionGroup className="runs-list">
                { 
                runsDetails.map( (singleRun) => <CSSTransition key={singleRun.id} timeout={500} classNames="single-run">
                    <Run removeRun={removeRun} details={singleRun} />
                </CSSTransition>
                )
                }
            </TransitionGroup>
            </main>
    </>
 }

 export default Runs;