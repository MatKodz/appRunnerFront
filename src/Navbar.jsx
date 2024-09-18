
import { Link } from "react-router-dom";

const Navbar = () => {
    return <nav className="bg-blue-100 p-3">
        <ul className="flex list-none text-lg m-0">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/runs">Liste des courses</Link></li>
            <li> <Link to="/profile">Mon Profil</Link></li>
            <li><Link to="/add-run">Ajouter une course</Link></li>
            <li><a href="http://localhost:3000/stats">Stats</a></li>
        </ul>
    </nav>
    ;
}

export default Navbar;