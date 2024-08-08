import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://10.20.23.32:6970";

export default function EnterScore() {
    const interviewer = localStorage.getItem("seniorName");
    const participant = localStorage.getItem("nickname");
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
            // Fetch criteria
            const criteriaRes = await axios.get(`${BASE_URL}/criteriaType?page=1&size=50`);
            const criteriaItems = criteriaRes.data.items;
            setTopics(criteriaItems);

            // Fetch junior data
            const juniorRes = await axios.get(`${BASE_URL}/junior/${junior_id}`);
            const juniorData = juniorRes.data;
            console.log("Junior data:", juniorData);

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
            [topicName]: { isOpen: true },
        }));
    };

    const handleSubmit = async () => {
        try {
            // Fetch junior data
            const juniorRes = await axios.get(`${BASE_URL}/junior/${junior_id}`);
            const juniorData = juniorRes.data;
            console.log("Junior data:", juniorData);

            // Prepare data to send to server
            const scores = topics.map(topic => ({
                criteria_id: topic.id,
                score: selectedTopics[topic.name]?.value || 0,
                comment: commentSet[topic.name] || ""
            }));

            const body = {
                junior_id: juniorData.id,
                senior_id: localStorage.getItem("seniorId"),
                scores: scores
            };

            // Update data to server
            const response = await axios.put(`${BASE_URL}/score`, body);
            console.log("Data submitted successfully:", response.data);

            // Navigate back to the table page
            navigate('/table-page'); 
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center !font-custom">
            <div className="inline-block bg-gray-700 p-10 min-w-[60%]">
                <div className="">
                    <span className="text-7xl">ให้คะแนน: &nbsp;</span>
                    <span className="text-7xl">{participant}&nbsp;</span>
                    <span className="text-7xl">โดย: &nbsp;</span>
                    <span className="text-7xl">{interviewer}</span>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="w-50 text-3xl">หัวข้อ</th>
                            <th className="w-50 text-3xl">คะแนน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((topic, index) => (
                            <tr key={index}>
                                <td className="text-3xl">{topic.name}</td>
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
