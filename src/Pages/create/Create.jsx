import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";

export default function Create() {
  const API = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [newLog, setNewLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });

  const handleChange = (event) => {
    setNewLog((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleCheckBox = (event) => {
    setNewLog((prevState) => {
      const mistakes = !newLog.mistakesWereMadeToday;
      return { ...prevState, mistakesWereMadeToday: mistakes };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({
        ...newLog,
        daysSinceLastCrisis: Number(newLog.daysSinceLastCrisis),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(API, options)
      .then((res) => res.json())
      .then((res) => {
        alert(`New Log with title: ${newLog.title} Created`);
        navigate("/logs");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit} className="create__form">
        <fieldset>
          <legend>New Log</legend>

          <input
            type="text"
            placeholder="Captain Name"
            name="captainName"
            value={newLog.captainName}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Title"
            name="title"
            value={newLog.title}
            onChange={handleChange}
          />

          <textarea
            name="post"
            placeholder="Log content"
            value={newLog.post}
            onChange={handleChange}
          />

          <div className="create__form-input">
            <label htmlFor="daysSinceLastCrisis">Days Since Last Crisis</label>
            <input
              type="number"
              name="daysSinceLastCrisis"
              id="daysSinceLastCrisis"
              value={newLog.daysSinceLastCrisis}
              onChange={handleChange}
            />
          </div>
          <div className="create__form-input">
            <input
              type="checkbox"
              id="mistakesWereMadeToday"
              checked={newLog.mistakesWereMadeToday}
              onChange={handleCheckBox}
            />

            <label htmlFor="mistakesWereMadeToday">
              Any mistakes made today ?
            </label>
          </div>
          <button type="submit" className="create__form-submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
