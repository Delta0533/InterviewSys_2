import React, { useState } from "react";
import "./EnterScore.css";

export default function EnterScore() {
    const interviewer = "Kimrama";
    const participant = "Johndoe";

    const cri = ["หัวข้อ1", "หัวข้อ2", "หัวข้อ3", "topic4", "topic5"];

    return (
        <div className="outer-container">
            <span className="inner-container">
                <h1>EnterScore Page</h1>
                <div className="info-container">
                    <span className="info">ให้คะแนน: &nbsp;</span>
                    <span className="info par-name">{participant}&nbsp;</span>
                    <span className="info">โดย: &nbsp;</span>
                    <span className="info inter-name">{interviewer}</span>
                </div>
                <table>
                    <tr>
                        <td className="cri-topic">หัวข้อ</td>
                        <td className="score-box">คะแนน</td>
                    </tr>
                    {cri.map((topic) => (
                        <tr>
                            <td>{topic}</td>
                            <td className="score-col">
                                <select className="score-entry">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <textarea
                                    className="text-entry"
                                    placeholder="content"
                                ></textarea>
                            </td>
                        </tr>
                    ))}
                </table>
                {/* <textarea
                    className="text-entry"
                    placeholder="comment"
                ></textarea> */}
                <br />
                <button className="submit-button" type="submit">
                    Submit
                </button>
            </span>
        </div>
    );
}
