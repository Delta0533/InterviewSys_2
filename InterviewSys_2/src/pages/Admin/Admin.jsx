import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from 'react-cookie';
const BaseURL = "http://10.20.23.32:6970"
const AdminTablePage = () => {
  const [data, setData] = useState(null);
  const [criteria, setCriteria] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [cookies, setCookie, removeCookie] = useCookies(['junior_student_id']);
  const getData = async () => {
    try {
        const response = await axios.get(`${BaseURL}/junior/score`);
        setData(response.data);
        const uniqueCriteria = new Set();
        
        response.data.items.forEach((junior) => {
            Object.keys(junior.score).forEach((criteriaName) => {
                uniqueCriteria.add(criteriaName);
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

  if (!data) return <div>Loading...</div>;
  
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedJuniors = [...data.items].sort((a, b) => {
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
    } else if (sortConfig.key === "Total Average Score") {
      return sortConfig.direction === "asc"
        ? a.total_avg_score - b.total_avg_score
        : b.total_avg_score - a.total_avg_score;
    } else if (a.score[sortConfig.key] !== undefined && b.score[sortConfig.key] !== undefined) {
      return sortConfig.direction === "asc"
        ? a.score[sortConfig.key] - b.score[sortConfig.key]
        : b.score[sortConfig.key] - a.score[sortConfig.key];
    } else {
      return 0;
    }
  });

  const filteredJuniors = sortedJuniors.filter((junior) => {
    return (
      junior.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      junior.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      junior.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      junior.academic_year.toString().includes(searchQuery)
    );
  });

  const handleJuniorDetail = (juniorStudentId) => { 
    setCookie('junior_student_id', juniorStudentId, { path: '/' })
    window.location.href = `/admin/${juniorStudentId}`;
  };

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

  
  return (
    <div className="overflow-x-auto container mx-auto px-10 py-10">
    <div className="">
      <div>
        <h1 className="text-3xl font-bold text-white-900">Welcome Mr.Admin</h1>
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
          <th></th>
          <th onClick={() => sortData("name")}>Name</th>
          <th onClick={() => sortData("nickname")}>Nickname</th>
          <th onClick={() => sortData("student_id")}>Student ID</th>
          <th onClick={() => sortData("academic_year")}>Year</th>
          {criteria.map((criterion, index) => (
            <th key={index} className="w-14" onClick={() => sortData(criterion)}>
              {criterion}
            </th>
          ))}
          <th onClick={() => sortData("Total Average Score")}>Total Average Score</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((junior, index) => (
          <tr className="hover" key={junior.id}>
            <th>{indexOfFirstItem + index + 1}</th>
            <td>{junior.name}</td>
            <td>{junior.nickname}</td>
            <td>{junior.student_id}</td>
            <td>{junior.academic_year}</td>
            {criteria.map((criterion, index) => {
              // Find score for the current criterion
              const scoreValue = junior.score[criterion];
              return (
                <td key={index}>{scoreValue ? scoreValue : "0"}</td>
              );
            })}
            <td>{junior.total_avg_score}</td>
            <td>
              <button
                className="btn btn-outline btn-success rounded-full py-2 px-4"
                onClick={() => handleJuniorDetail(junior.student_id)}
              >
                Detail
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

export default AdminTablePage;