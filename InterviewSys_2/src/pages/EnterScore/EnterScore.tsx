import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EnterScore() {
    const interviewer = "Kimrama";
    const participant = "Johndoe";
    const topics = ["โง้", "ฉลาด", "สวย", "หล่อ", "เท่", "รวย"];
    const [selectedTopics, setSelectedTopics] = useState({});
    const [commentSet, setCommentSet] = useState({});
    const BASE_URL = "http://10.20.23.32:6970";

    const { junior_id } = useParams();
    useEffect(() => {
        initializePageData();
    }, []);

    const initializePageData = async () => {
        console.log(`${BASE_URL}/${junior_id}`);
        const res = await axios.get(`${BASE_URL}/junior/${junior_id}`);
    };

    const handleComment = (topic, event) => {
        setCommentSet((prev) => ({
            ...prev,
            [topic]: {
                value: event.target.value,
            },
        }));
        console.log(commentSet);
    };
    const handleSelectChange = (topic, event) => {
        setSelectedTopics((prevState) => ({
            ...prevState,
            [topic]: {
                value: event.target.value,
                isOpen: false,
            },
        }));
        console.log(selectedTopics);
    };
    const setCanOpen = (topic) => {
        setSelectedTopics((prevState) => ({
            ...prevState,
            [topic]: { isOpen: true },
        }));
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
                                <td className="text-3xl">{topic}</td>
                                <td className="flex items-center align-middle">
                                    <div className="dropdown">
                                        <div
                                            tabIndex={0}
                                            role="button"
                                            className="btn m-1 w-[100px]"
                                            onClick={(e) => setCanOpen(topic)}
                                        >
                                            {selectedTopics[topic]?.value ==
                                            undefined
                                                ? "กดเพื่อให้คะแนน"
                                                : `${selectedTopics[topic].value}`}
                                        </div>
                                        {selectedTopics[`${topic}`]?.isOpen ==
                                            undefined ||
                                            (selectedTopics[`${topic}`]
                                                ?.isOpen == true && (
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                                >
                                                    <li>
                                                        <option
                                                            className="font-xl"
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            0
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            1
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            2
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            3
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            4
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            5
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            6
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            7
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            8
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            9
                                                        </option>
                                                    </li>
                                                    <li>
                                                        <option
                                                            onClick={(e) =>
                                                                handleSelectChange(
                                                                    topic,
                                                                    e
                                                                )
                                                            }
                                                            key={index}
                                                        >
                                                            10
                                                        </option>
                                                    </li>
                                                </ul>
                                            ))}
                                    </div>
                                    <textarea
                                        placeholder="เพิ่มเติม"
                                        className="textarea textarea-bordered h-10 textarea-md w-full resize-none"
                                        onChange={(e) =>
                                            handleComment(topic, e)
                                        }
                                    >
                                        {commentSet[topic]}
                                    </textarea>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <button className="btn btn-success px-40 w-full" type="submit">
                    Submit
                </button>
            </div>
        </div>
    );
}
