import { Link } from "react-router-dom";
import "./button.css";

export default function Button() {
  return (
    <div>
      <button className="box-btn">
        <Link className="txt-btn">Add Score</Link>
      </button>
    </div>
  );
}
