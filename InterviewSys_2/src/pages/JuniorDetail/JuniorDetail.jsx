import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
const BaseURL = "http://10.20.23.32:6970"
const JuniorPage = () =>{
  const [data, setData] = useState(null);
  const [juniorName, setJuniorName] = useState("");
  const [juniorNickname, setJuniorNickname] = useState("");
  const [juniorAcademicYear, setJuniorAcademicYear] = useState("");
  const [totalAverageScore, setTotalAverageScore] = useState("");
  const [criteria, setCriteria] = useState([]);

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
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) return <div>Loading...</div>;

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
                <td>
                  <button
                    className="btn btn-outline btn-success rounded-full py-2 px-4"
                    // onClick={() => handleJuniorDetail(junior.student_id)}
                  >
                    Comments
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JuniorPage;