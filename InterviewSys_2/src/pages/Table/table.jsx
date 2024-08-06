//TABLE PAGE
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const apiURL = "http://10.20.23.32:6970/junior/score";

export default function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await axios.get(apiURL);
        setData(response.data.items);
    };

    return (
        <div className="overflow-x-auto container mx-auto px-10 py-10">
            <table className="table bg-gray-700">
                {/* head */}
                <thead>
                    <tr className="">
                        <th></th>
                        <th>Name</th>
                        <th>Student ID</th>
                        <th>Topic</th>
                        <th>Topic</th>
                        <th>Topic</th>
                        <th>Topic</th>
                        <th>Topic</th>
                        <th>Add Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr className="hover" key={index}>
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.student_id}</td>
                                <td>score</td>
                                <td>score</td>
                                <td>score</td>
                                <td>score</td>
                                <td>score</td>
                                <td>
                                    <Link to="/enter">
                                        <button className="btn btn-outline btn-success rounded-full py-2 px-4">
                                            Add Score
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
