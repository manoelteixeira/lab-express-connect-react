import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import "./edit.css";

export default function Edit() {
  const API = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const { index } = useParams();
  const [log, setLog] = useState(null);

  useEffect(() => {
    fetch(`${API}/${index}`)
      .then((res) => res.json())
      .then((res) => {
        setLog((prevState) => res);
      })
      .catch((err) => console.error(err));
  }, [index]);

  const handleChange = (event) => {
    setLog((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleCheckBox = (event) => {
    setLog((prevState) => {
      const mistakes = !log.mistakesWereMadeToday;
      return { ...prevState, mistakesWereMadeToday: mistakes };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "PUT",
      body: JSON.stringify({
        ...log,
        daysSinceLastCrisis: Number(log.daysSinceLastCrisis),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`${API}/${index}`, options)
      .then((res) => res.json())
      .then((res) => {
        alert(`Log with title: ${log.title} Updated`);
        navigate("/logs");
      })
      .catch((err) => console.error(err));
  };
  if (!log) return <div>Loading...</div>;
  return (
    <div className="create">
      <form onSubmit={handleSubmit} className="create__form">
        <fieldset>
          <legend>Edit Log</legend>

          <input
            type="text"
            placeholder="Captain Name"
            name="captainName"
            value={log.captainName}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Title"
            name="title"
            value={log.title}
            onChange={handleChange}
          />

          <textarea
            name="post"
            placeholder="Log content"
            value={log.post}
            onChange={handleChange}
          />

          <div className="create__form-input">
            <label htmlFor="daysSinceLastCrisis">Days Since Last Crisis</label>
            <input
              type="number"
              name="daysSinceLastCrisis"
              id="daysSinceLastCrisis"
              value={log.daysSinceLastCrisis}
              onChange={handleChange}
            />
          </div>
          <div className="create__form-input">
            <input
              type="checkbox"
              id="mistakesWereMadeToday"
              checked={log.mistakesWereMadeToday}
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
