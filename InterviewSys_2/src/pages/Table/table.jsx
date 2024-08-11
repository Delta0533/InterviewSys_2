import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const apiURL = `${import.meta.env.VITE_GET_API_URL}/senior/get_assigned_score/`;

export default function Table() {
  const [data, setData] = useState(null); // Initial value should be null for an object
  const [criteria, setCriteria] = useState([]); // State for unique criteria names
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50); // Set items per page
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [seniorName, setSeniorName] = useState(""); // State for senior name

  // Get the senior name from the localStorage
  useEffect(() => {
    setSeniorName(localStorage.getItem("seniorName"));
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        apiURL + localStorage.getItem("seniorId")
      ); // Adjust the key name based on your localStorage usage
      setData(response.data);

      // Extract unique criteria names
      const uniqueCriteria = new Set();
      response.data.juniors.forEach((junior) => {
        junior.scores.forEach((score) => {
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

    if (localStorage.getItem("nickname")) {
      localStorage.removeItem("nickname");
    }
  }, []);

  if (!data) return <div>Loading...</div>;

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedJuniors = [...data.juniors].sort((a, b) => {
    if (sortConfig.key === "name") {
      return sortConfig.direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortConfig.key === "nickname") {
      return sortConfig.direction === "asc"
        ? a.nickname.localeCompare(b.nickname)
        : b.nickname.localeCompare(a.nickname);
    } else if (sortConfig.key === "student_id") {
      return sortConfig.direction === "asc"
        ? a.student_id.localeCompare(b.student_id)
        : b.student_id.localeCompare(a.student_id);
    } else if (sortConfig.key === "academic_year") {
      return sortConfig.direction === "asc"
        ? a.academic_year - b.academic_year
        : b.academic_year - a.academic_year;
    } else {
      return 0;
    }
  });

  // Filter data based on search query
  const filteredJuniors = sortedJuniors.filter((junior) => {
    return (
      junior.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      junior.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      junior.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      junior.academic_year.toString().includes(searchQuery)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJuniors.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredJuniors.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem("seniorId"); // Remove the seniorId from localStorage
    window.location.href = "/";
  };

  const handleAddScore = (juniorStudentId, juniorId) => {
    localStorage.removeItem('juniorStudentId');
    localStorage.removeItem('juniorId');
    localStorage.setItem('juniorStudentId', juniorStudentId); 
    localStorage.setItem('juniorId', juniorId); 
    window.location.href = `/enter/${juniorStudentId}`;
  };

  return (
    <div className="overflow-x-auto container mx-auto px-10 py-10">
      <div className="">
        <div className="flex">
          <h1 className="text-2xl font-bold my-auto">
            Welcome, <span style={{ color: "#00d986" }}>{seniorName}</span>{" "}
          </h1>
          <button
            className="btn btn-outline btn-error rounded-full py-2 px-4 my-2 ml-auto"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full rounded-full py-2 px-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table className="table table-xs bg-gray-700 table-auto">
      <thead>
        <tr>
          <th className="w-12 max-width-12 text-center">No.</th> {/* Fixed width */}
          <th className="w-52 text-center max-width-52">Name</th> {/* Fixed width */}
          <th className="w-28 text-center max-width-28">Nickname</th> {/* Fixed width */}
          <th className="w-32 text-center max-width-32">Student ID</th> {/* Fixed width */}
          <th className="w-16 text-center max-width-16">Year</th> {/* Fixed width */}
          {criteria.map((criterion, index) => (
            <th
              key={index}
              className="overflow-hidden text-ellipsis whitespace-nowrap text-center min-w-[4rem] max-w-[4rem]"
            >
              {criterion}
            </th>
          ))}
          <th className="w-24 text-center">Add Score</th> {/* Fixed width */}
        </tr>
      </thead>
        <tbody>
          {currentItems.map((junior, index) => (
            <tr className="hover" key={junior.id}>
              <th className="text-center w-14 overflow-hidden text-ellipsis whitespace-nowrap">{indexOfFirstItem + index + 1}</th>
              <td className="text-left w-14 overflow-hidden text-ellipsis whitespace-nowrap">{junior.name}</td>
              <td className="text-left w-14 overflow-hidden text-ellipsis whitespace-nowrap">{junior.nickname}</td>
              <td className="text-center w-14 overflow-hidden text-ellipsis whitespace-nowrap">{junior.student_id}</td>
              <td className="text-center w-14 overflow-hidden text-ellipsis whitespace-nowrap">{junior.academic_year}</td>
              {criteria.map((criterion, index) => {
                // Find score for the current criterion
                const scoreEntry = junior.scores.find(
                  (score) => score.criteria_name === criterion
                );
                return (
                  <td key={index} className="text-center w-14 text-center overflow-hidden text-ellipsis whitespace-nowrap">{scoreEntry ? scoreEntry.score : "-"}</td>
                );
              })}
              <td>
                <button
                  className="btn btn-outline btn-success rounded-full py-2 px-4"
                  
                  onClick={() => handleAddScore(junior.student_id, junior.id)}

                >
                  Add Score
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination mt-4">
        <button
          className="btn btn-outline"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn btn-outline ${
              currentPage === index + 1 ? "btn-active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-outline"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
