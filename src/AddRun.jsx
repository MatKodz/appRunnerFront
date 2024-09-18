
import { useState } from "react";
import Navbar from "./Navbar";
import iconClock from './assets/img/icon-clock.png';
import iconRuler from './assets/img/icon-ruler.png';
import iconUp from './assets/img/icon-up.png';

const convertTimetoHours = (stringTime) => {
    let [h,m,s] = stringTime.split(":")
    m = (+m + s/60) / 60
    return (+h + m)
}
 

const Run = ({details}) => {

    const dateString = new Date(details.date).toLocaleDateString('fr-US', { weekday:"long", year:"numeric", month:"numeric", day:"numeric", hour:"numeric", minute:"numeric"})
    
    return <div className="grid m-3 align-items-center border-bottom-3 border-blue-200">
        <h3 className="color-blue-100 p-1">New</h3>
        <div className="col run-date">{dateString}</div>
        <time className="col run-duration"> <img src={iconClock} alt="" /> {details.duree} </time>
        <div className="col run-length font-bold">
        <img src={iconRuler} alt="" /> {details.distance}km
        </div>
        <div className="font-bold">
        <img src={iconUp} alt="" /> {details.denivelle}m
        </div>
        <div className="col">
            Moy. : <strong>{(details.distance / convertTimetoHours(details.duree)).toFixed(1)} km/h </strong>
        </div>
        <div className="col">
            {details.lieu}
        </div>
        <div className="col">
            Par {details.fk_profil}
        </div>
    </div>
 }

const AddRun = () => {


    const [formData, setFormData] = useState({date: "", duree: "", distance: "", denivelle:"", lieu: "", fk_profile: 1});

    const [erreur, setErreur] = useState("");

    const [runRegistered, setRunRegistered] = useState(false);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setErreur("")
      };

    const registerRun = () => {
        console.log(formData)
        for (const property in formData) {
            if(!formData[property]) {
                console.log('erreur : ' + property)
                setErreur(`Il manque le champ : ${property}`)
                return
            }
        }
        const dataCheck = {...formData, date: formData.date +" "+ formData.heure}
        delete dataCheck['heure'];
        let options = {
            method: "POST",
            body: JSON.stringify(dataCheck),
            headers: {
                "Content-Type": "application/json",
              }
        }
        fetch("http://localhost:3000/api/addRun",options)
        .then( rep => rep.json())
        .then (json => {
            console.log(json.message)
            document.querySelector("#register").reset();
            setRunRegistered(true)
        })
        .catch ( e => {
            console.log(e)
            setErreur("Une erreur est survenue, a course n'a pas été enregistrée")
        } )
    }

    return <div>
        <Navbar />
        <main>
        <h2>Ajouter une course</h2>
        {erreur && <div className="bg-red-50 text-red-800 p-3 my-4 border-1 border-red-800">{erreur}</div>}
        {runRegistered && <Run details={formData} />}
        <form action="" id="register" className="flex flex-wrap">
            <div>
                <label>
                    Date
                </label>
                <input type="date" name="date" onChange={handleChange} />
            </div>
            <div>
                <label>
                    Heure
                </label>
                <input type="time" name="heure" onChange={handleChange} />
            </div>
            <div>
                <label>
                    Durée au format hh:mm:ss
                </label>
                <input type="text" name="duree" onChange={handleChange} />
            </div>
            <div>
                <label>
                    Distance en Km
                </label>
                <input type="number" name="distance" onChange={handleChange} />
            </div>
            <div>
                <label>
                    Dénivellé en M
                </label>
                <input type="number" name="denivelle" onChange={handleChange} />
            </div>
            <div>
                <label> Lieu
                </label>
                <input type="text" name="lieu" onChange={handleChange} />
            </div>
            <button type="button" className="bg-green-700 text-white p-3 text-xl w-full" onClick={registerRun}>Enregistrer ma course </button>
        </form>
     </main>
    </div>

}

export default AddRun;