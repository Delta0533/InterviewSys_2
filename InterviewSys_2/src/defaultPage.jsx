import { Link } from "react-router-dom";
import "./defaultPage.css";
export default function DefaultPage() {
    return (
        <div>
            <h1>Default Page</h1>
            <Link cto="/login" className="link-button">
                Login Page
            </Link>
            <Link to="/table" className="link-button">
                Table Page
            </Link>
            <Link to="/enter" className="link-button">
                Enter Page
            </Link>
        </div>
    );
}
