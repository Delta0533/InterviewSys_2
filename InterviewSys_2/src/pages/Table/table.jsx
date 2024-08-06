import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const apiURL = "http://10.20.23.32:6970/senior/get_assigned_score/66b241cd739a6118eba4b6ce";

export default function Table() {
  const [data, setData] = useState(null);  // Initial value should be null for an object
  const [criteria, setCriteria] = useState([]); // State for unique criteria names

  const getData = async () => {
    try {
      const response = await axios.get(apiURL);
      setData(response.data);
      
      // Extract unique criteria names
      const uniqueCriteria = new Set();
      response.data.juniors.forEach(junior => {
        junior.scores.forEach(score => {
          uniqueCriteria.add(score.criteria_name);
        });
      });
      setCriteria(Array.from(uniqueCriteria));
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
          <tr>
            <th></th>
            <th>Name</th>
            <th>Nickname</th>
            <th>Student ID</th>
            <th>Year</th>
            {criteria.map((criterion, index) => (
              <th key={index}>{criterion}</th>
            ))}
            <th>Add Score</th>
          </tr>
        </thead>
        <tbody>
          {data.juniors.map((junior, index) => (
            <tr className="hover" key={junior.id}>
              <th>{index + 1}</th>
              <td>{junior.name}</td>
              <td>{junior.nickname}</td>
              <td>{junior.student_id}</td>
              <td>{junior.academic_year}</td>
              {criteria.map((criterion, index) => {
                // Find score for the current criterion
                const scoreEntry = junior.scores.find(score => score.criteria_name === criterion);
                return (
                  <td key={index}>{scoreEntry ? scoreEntry.score : '0'}</td>
                );
              })}
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
