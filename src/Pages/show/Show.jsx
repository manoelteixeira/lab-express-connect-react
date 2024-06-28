import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./show.css";

export default function Show() {
  const { index } = useParams();
  const [log, setLog] = useState(null);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_URL;

  useEffect(() => {
    fetch(`${API}/${index}`)
      .then((res) => res.json())
      .then((res) => {
        const mistakes = res.mistakesWereMadeToday ? "yes" : "no";
        setLog({
          ...res,
          mistakesWereMadeToday: mistakes,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = () => {
    const options = {
      method: "DELETE",
    };
    fetch(`${API}/${index}`, options)
      .then((res) => res.json())
      .then((res) => {
        alert(`${log.title} Deleted!`);
        navigate("/logs");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {log && (
        <div className="show">
          <div className="log">
            <h1 className="log__title">{log.title}</h1>
            <p className="log__post">{log.post}</p>
            <div className="log__status">
              <div className="log__status-mistakes">
                Any mistakes made today:{" "}
                <span
                  className={log.mistakesWereMadeToday === "yes" && "mistakes"}
                >
                  {log.mistakesWereMadeToday}
                </span>
              </div>
              <div className="log__status-days">
                Days since last crisis:{" "}
                <span className={log.daysSinceLastCrisis < 100 && "crisis"}>
                  {log.daysSinceLastCrisis}
                </span>
              </div>
            </div>
            <div className="log__capitain">
              Captain: <span>{log.captainName}</span>
            </div>
          </div>
          <div className="controls">
            <Link to="/logs">
              <div className="controls__back">Back</div>
            </Link>
            <Link to={`/logs/${index}/edit`}>
              <div className="controls__edit">Edit</div>
            </Link>
            <div className="controls__delete" onClick={handleDelete}>
              Delete
            </div>
          </div>
        </div>
      )}
    </>
  );
}
