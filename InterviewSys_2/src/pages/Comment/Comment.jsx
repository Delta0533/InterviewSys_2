import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
const BaseURL = "http://10.20.23.32:6970"
const CommentsPage = () =>{
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [juniorName, setJuniorName] = useState("");
  const [juniorNickname, setJuniorNickname] = useState("");
  const [juniorAcademicYear, setJuniorAcademicYear] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  const getData = async () => {
    const juniorCookie = Cookies.get('junior_student_id')
    if(juniorCookie){
      try {
          
          const response = await axios.get(`${BaseURL}/junior/score/${juniorCookie}`);
          setData(response.data);
          setJuniorName(response.data.name);
          setJuniorNickname(response.data.nickname);
          setJuniorAcademicYear(response.data.academic_year);

          const uniqueCriteria = new Set();

          Object.keys(response.data.score).forEach((criteriaName) => {
              uniqueCriteria.add(criteriaName);
          });
          setCriteria(Array.from(uniqueCriteria));

          const criteriaResponse = await axios.get(`${BaseURL}/criteriaType`);
          setCriteriaData(criteriaResponse.data);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    }
  };
  
  const filteredComments = comments.filter((senior) => {
    return (
      senior.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  });
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredComments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredComments.length / itemsPerPage);


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return(
    <div className="w-screen flex justify-center items-center !font-custom">
      <div className="inline-block bg-gray-700 p-10 min-w-[90%] max-w-[90%] my-20 rounded-lg">
        <div className="pb-10 flex container justify-between items-center ">
          <span className="text-3xl font-bold pb-5" style={{ color: '#00d986' }}>น้อง{juniorNickname}</span>
          <span className="text-xl">{juniorName}</span>
          <span className="text-xl">ชั้นปีที่ {juniorAcademicYear}</span>
        </div>
        <div className="mb-4">
        <input
          type="text"
          placeholder="Search Commenter..."
          className="input input-bordered w-full rounded-full py-2 px-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-50 text-xl">หัวข้อ</th>
              <th className="w-50 text-xl">คะแนน</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        <div className="pagination mt-4 flex  justify-center">
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
            // onClick={handleNextPage}
            // disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default CommentsPage;