import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const API = process.env.REACT_APP_URL;
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        setLogs(res);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home">
      <h1 className="home__title">Logs</h1>
      <table className="home__table">
        <thead>
          <tr>
            <th scope="col">Mistakes</th>
            <th scope="col">Capitain Name</th>
            <th scope="col">See this Log</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{log.mistakesWereMadeToday && "💥"}</th>
                <td>{log.captainName}</td>
                <td>
                  <Link to={`/logs/${idx}`}>{log.title}</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
