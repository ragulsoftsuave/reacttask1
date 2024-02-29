import "../assets/styles/notfoundpage.css";
import pnf from "../assets/images/pnf.png"
import { Link } from "react-router-dom";

export default function NotFound() {
    
    return(<div className="notfound-wrap">
        <img className="pnf-img" src={pnf} alt="" />
        <h1>Page Not Found!</h1>
        <Link to="/">Go to home</Link>
    </div>)
}