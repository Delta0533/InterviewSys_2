import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
const BaseURL = "http://10.20.23.32:6970"
const JuniorPage = () =>{
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [juniorName, setJuniorName] = useState("");
  const [juniorNickname, setJuniorNickname] = useState("");
  const [juniorAcademicYear, setJuniorAcademicYear] = useState("");
  const [totalAverageScore, setTotalAverageScore] = useState("");
  const [criteria, setCriteria] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [cookies, setCookie, removeCookie] = useCookies(['criteria']);
  const getData = async () => {
    const juniorCookie = Cookies.get('junior_student_id')
    if(juniorCookie){
      try {
          
          const response = await axios.get(`${BaseURL}/junior/score/${juniorCookie}`);
          setData(response.data);
          setJuniorName(response.data.name);
          setJuniorNickname(response.data.nickname);
          setJuniorAcademicYear(response.data.academic_year);
          setTotalAverageScore(response.data.total_avg_score)
          const uniqueCriteria = new Set();

          Object.keys(response.data.score).forEach((criteriaName) => {
              uniqueCriteria.add(criteriaName);
          });
          setCriteria(Array.from(uniqueCriteria));
          
          const commentResponse = await axios.get(`${BaseURL}/junior/comment/${juniorCookie}`)
          const uniqueCriteriaComment = new Set();

          commentResponse.data.criterias.forEach((criteria) => {
            uniqueCriteriaComment.add(criteria)
          });
          setComments(Array.from(uniqueCriteriaComment));

      } catch (error) {
          console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) return <div>Loading...</div>;


  //break criteria to comments array again
  const flattenedComments = comments.flatMap(criteria =>
    criteria.comments.map(comment => ({
      criteria_name: criteria.criteria_name,
      senior_name: comment.senior_name,
      comment: comment.comment
    }))
  );

  const filteredComments = flattenedComments.filter(item => {
    return (
      item.criteria_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.senior_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="pb-10 flex container justify-between items-center ">
          <span className="text-3xl font-bold pb-5" style={{ color: '#00d986'}}>Total Average score : {totalAverageScore}</span>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-50 text-xl">หัวข้อ</th>
              <th className="w-50 text-xl">คะแนน</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((criteria, index) => (
              <tr key={index}>
                <td className="text-lg">{criteria}</td>
                <td className="text-lg">{data.score[criteria]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pt-10 pb-10 flex justify-center text-3xl font-bold pb-5">
            Comment
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
        <table className="table w-full">
          <thead>
            <tr>
              <th className=" text-xl">Topic</th>
              <th className=" text-xl">From</th>
              <th className=" text-xl">Comment</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="text-lg">{item.criteria_name}</td>
                <td className="text-lg">{item.senior_name}</td>
                <td className="text-lg">{item.comment}</td>
              </tr>
            ))}
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
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default JuniorPage;