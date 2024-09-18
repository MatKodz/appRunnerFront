import { useState, useEffect } from "react"
import Navbar from "./Navbar";
import { config } from "../env/Configuration";

const Profile = () => {

    const [profiles,setProfiles] = useState([{id_profil: 100, pseudonyme: "Mario", annee_naissance : 2000, Email : "mail@mail.fr" }]);

    useEffect(() => {
        fetch(config.url.API_URL + "/profiles")
        .then(rep => rep.json())
        .then( data => setProfiles(data))
    },[])

return <>
            <Navbar/>
            <main>
            <p className="grid bg-yellow-100">
                <span className="col">Id</span>
                <span className="col">Pseudo</span>
                <span className="col">Année de naissance</span>
                <span className="col">Email</span>
            </p>
            { 
            profiles.map(profile => <p className="grid" key={profile.id_profil}>
                <span className="col">{profile.id_profil}</span>
                <span className="col">{profile.pseudonyme}</span>
                <span className="col">{profile.annee_naissance}</span>
                <span className="col">{profile.Email}</span>
                </p>
                )
            }
            </main>
        </>
}

export default Profile