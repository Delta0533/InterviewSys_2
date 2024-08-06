//TABLE PAGE
import { Link } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const apiURL = "http://10.20.23.32:6970";

export default function Table() {
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
                    {/* row 1 */}
                    <tr className="hover">
                        <th>1</th>
                        <td>Kim rama</td>
                        <td>6601XXXX</td>
                        <td>score</td>
                        <td>score</td>
                        <td>score</td>
                        <td>score</td>
                        <td>score</td>
                        <td>
                            <Link to="/enter/123">
                                <button className="btn btn-outline btn-success rounded-full py-2 px-4">
                                    Add Score
                                </button>
                            </Link>
                        </td>
                    </tr>
                    {/* row 2 */}
                    <tr className="hover">
                        <th>2</th>
                        <td>Kim rama</td>
                        <td>6601XXXX</td>
                        <td>score</td>
                        <td>score</td>
                        <td>score</td>
                        <td>score</td>
                        <td>score</td>
                        <td>
                            <Link to="/enter/456">
                                <button className="btn btn-outline btn-success rounded-full py-2 px-4">
                                    Add Score
                                </button>
                            </Link>
                        </td>
                    </tr>
                    {/* row 3 */}
                    <tr className="hover">
                        <th>3</th>
                        <td>Kim rama</td>
                        <td>6601XXXX</td>
                        <td>score</td>
                        <td>score</td>
                        <td>score</td>
                        <td>score</td>
                        <td>score</td>
                        <td>
                            <Link to="/enter/789">
                                <button className="btn btn-outline btn-success rounded-full py-2 px-4">
                                    Add Score
                                </button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
