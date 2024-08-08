import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://10.20.23.32:6970";

export default function EnterScore() {

    const [juniorName, setJuniorName] = useState("");
    const [juniorNickname, setJuniorNickname] = useState("");
    const [juniorAcademicYear, setJuniorAcademicYear] = useState("");

    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState({});
    const [commentSet, setCommentSet] = useState({});
    const { junior_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        initializePageData();
    }, []);

    const initializePageData = async () => {
        try {
            // Fetch junior data to display on the page
            console.log(localStorage.getItem("juniorStudentId"));
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
            console.log(scoreRes.data['scores']);

            if (scoreRes.data['scores'].length > 0) {
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
        console.log(commentSet);
    };

    const handleSelectChange = (topicName, event) => {
        setSelectedTopics((prevState) => ({
            ...prevState,
            [topicName]: {
                value: event.target.innerText,
                isOpen: false,
            },
        }));
        console.log(selectedTopics);
    };

    const setCanOpen = (topicName) => {
        setSelectedTopics((prevState) => ({
            ...prevState,
            [topicName]: {value: selectedTopics[topicName]?.value, isOpen: true },
        }));
    };

    const handleSubmit = async () => {
        try {
            
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="w-screen flex justify-center items-center !font-custom">
            <div className="inline-block bg-gray-700 p-10 min-w-[60%] my-20 rounded-lg">
                <div className="pb-10 flex container justify-between items-center ">
                    <span className="text-6xl font-bold pb-5" style={{color: '#00d986'}}>น้อง{juniorNickname}</span>
                    <span className="text-2xl">{juniorName}</span>
                    <span className="text-2xl">ชั้นปีที่ {juniorAcademicYear}</span>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="w-50 text-2xl">หัวข้อ</th>
                            <th className="w-50 text-2xl">คะแนน</th>
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
                <button className="btn btn-success px-40 w-full" type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}
