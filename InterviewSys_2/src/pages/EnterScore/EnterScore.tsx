import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie';
const BASE_URL = "http://10.20.23.32:6970";

export default function EnterScore() {
  const [juniorName, setJuniorName] = useState("");
  const [juniorNickname, setJuniorNickname] = useState("");
  const [juniorAcademicYear, setJuniorAcademicYear] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState({});
  const [commentSet, setCommentSet] = useState({});
  const navigate = useNavigate();

  const [isJuniorAlreadyScored, setIsJuniorAlreadyScored] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    initializePageData();
  }, []);

  
  const initializePageData = async () => {
    try {
      // Fetch junior data to display on the page
      const juniorRes = await axios.get(`${BASE_URL}/junior/${localStorage.getItem("juniorStudentId")}`);
      const juniorData = juniorRes.data;
      setJuniorName(juniorData.name);
      setJuniorNickname(juniorData.nickname);
      setJuniorAcademicYear(juniorData.academic_year);

      // Fetch all available criteria to display on the page
      const criteriaRes = await axios.get(`${BASE_URL}/criteriaType?page=1&size=50`);
      const criteriaItems = criteriaRes.data.items;
      setTopics(criteriaItems);

      // Check if the junior has already been scored
      const scoreRes = await axios.get(`${BASE_URL}/senior/get_assigned_score/${localStorage.getItem("seniorId")}/${localStorage.getItem("juniorId")}`);
      if (scoreRes.data['scores'].length > 0) {
        setIsJuniorAlreadyScored(true);
        const scores = scoreRes.data['scores'];
        const selectedTopics = {};
        const commentSet = {};
        for (const score of scores) {
          selectedTopics[score.criteria_name] = {
            value: score.score,
            isOpen: true,
          };
          commentSet[score.criteria_name] = score.comment;
        }
        setSelectedTopics(selectedTopics);
        setCommentSet(commentSet);
      } else {
        setIsJuniorAlreadyScored(false);
      }
    } catch (error) {
      console.error("Error initializing page data:", error);
    }
  };

  const handleComment = (topicName, event) => {
    setCommentSet((prev) => ({
      ...prev,
      [topicName]: event.target.value,
    }));
  };

  const handleSelectChange = (topicName, event) => {
    setSelectedTopics((prevState) => ({
      ...prevState,
      [topicName]: {
        value: event.target.innerText,
        isOpen: false,
      },
    }));
  };

  const setCanOpen = (topicName) => {
    setSelectedTopics((prevState) => ({
      ...prevState,
      [topicName]: { value: selectedTopics[topicName]?.value, isOpen: true },
    }));
  };

  const handleSubmit = async () => {
    try {
      const scores = [];
      for (const [topicName, topicValue] of Object.entries(selectedTopics)) {
        const score = {
          "junior_id": localStorage.getItem("juniorId"),
          "senior_id": localStorage.getItem("seniorId"),
          "criteria_id": topics.find((topic) => topic.name === topicName).id,
          "score": Number(topicValue.value),
        };

        if (commentSet[topicName]) {
          score.comment = commentSet[topicName];
        }

        if (isJuniorAlreadyScored) {
          await axios.put(`${BASE_URL}/score`, score);
        } else {
          await axios.post(`${BASE_URL}/score`, score);
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
    localStorage.removeItem("juniorId");
    localStorage.removeItem("juniorStudentId");
    navigate("/table");
    }

  };

  const handleSave = () => {
    openSaveDialog();
  }

  const handleCancel = () => {
    closeSaveDialog();
  }

  const openSaveDialog = () => {
    setIsSaveDialogOpen(true);
  };

  const closeSaveDialog = () => {
    setIsSaveDialogOpen(false);
  };

  return (
    <div className="w-screen flex justify-center items-center !font-custom">
      <div className="inline-block bg-gray-700 p-10 min-w-[90%] max-w-[90%] my-20 rounded-lg">
        <div className="pb-10 flex container justify-between items-center ">
          <span className="text-3xl font-bold pb-5" style={{ color: '#00d986' }}>น้อง{juniorNickname}</span>
          <span className="text-xl">{juniorName}</span>
          <span className="text-xl">ชั้นปีที่ {juniorAcademicYear}</span>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-50 text-xl">หัวข้อ</th>
              <th className="w-50 text-xl">คะแนน</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic, index) => (
              <tr key={index}>
                <td className="text-xl">{topic.name}</td>
                <td className="flex items-center align-middle">
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 w-[100px]"
                      onClick={() => setCanOpen(topic.name)}
                    >
                      {selectedTopics[topic.name]?.value === undefined
                        ? "กดเพื่อให้คะแนน"
                        : `${selectedTopics[topic.name].value}`}
                    </div>
                    {selectedTopics[topic.name]?.isOpen && (
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
                        {[...Array(11).keys()].map((score) => (
                          <li key={score}>
                            <option
                              className="font-xl"
                              onClick={(e) =>
                                handleSelectChange(topic.name, e)
                              }
                            >
                              {score}
                            </option>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <textarea
                    placeholder="เพิ่มเติม"
                    className="textarea textarea-bordered h-10 textarea-md w-full resize-none"
                    onChange={(e) => handleComment(topic.name, e)}
                    value={commentSet[topic.name] || ""}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button className="btn btn-success px-40 w-full" type="submit" onClick={handleSave}>
          Submit
        </button>
      </div>

      {/* Dialog */}
      {isSaveDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">&#9888;</i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold text-black">Save score</p>
                  <p className="text-sm text-gray-700 mt-1">Are you sure you want to save the score?</p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  id="confirm-delete-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  id="confirm-cancel-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1 text-black"
                  onClick={closeSaveDialog}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
