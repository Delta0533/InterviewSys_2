import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const apiURL =
    "http://10.20.23.32:6970/senior/get_assigned_score/66b07deb090b1d517582ee3e";

export default function Table() {
    const [data, setData] = useState(null); // initial value should be null for an object

    const getData = async () => {
        try {
            const response = await axios.get(apiURL);
            setData(response.data); // Update data with the entire response
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (!data) return <div>Loading...</div>; // Handle loading state

    return (
        <div className="overflow-x-auto container mx-auto px-10 py-10">
            <table className="table bg-gray-700">
                {/* head */}
                <thead>
                    <tr className="">
                        <th></th>
                        <th>Name</th>
                        <th>Student ID</th>
                        <th>Score</th>
                        <th>Score</th>
                        <th>Score</th>
                        <th>Score</th>
                        <th>Score</th>
                        <th>Add Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.juniors.map((junior, index) => (
                        <tr className="hover" key={junior.junior_id}>
                            <th>{index + 1}</th>
                            <td>{junior.junior_name}</td>
                            <td>{junior.junior_id}</td>
                            <td>{junior.scores[index]?.score || "0"}</td>{" "}
                            {/* Displaying first score */}
                            <td>
                                {junior.scores[index + 1]?.score || "0"}
                            </td>{" "}
                            {/* Handle additional scores */}
                            <td>{junior.scores[index + 2]?.score || "0"}</td>
                            <td>{junior.scores[index + 3]?.score || "0"}</td>
                            <td>{junior.scores[index + 4]?.score || "0"}</td>
                            <td>
                                <Link to="/enter">
                                    <button className="btn btn-outline btn-success rounded-full py-2 px-4">
                                        Add Score
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
