import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CodeSnippetTable.module.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
function CodeSnippetTable() {
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/app/entries`)
      .then((response) => {
        setCodeSnippets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching code snippets:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.snippetContainer}>
      <h1>Code Snippet Entries</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : codeSnippets.length === 0 ? (
        <p>No code snippets available</p>
      ) : (
        <table className={styles["snippet-table"]}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Code Language</th>
              <th>Standard Input</th>
              <th>Timestamp</th>
              <th>Source Code (First 100 Characters)</th>
            </tr>
          </thead>
          <tbody>
            {codeSnippets.map((codeSnippet) => (
              <tr key={codeSnippet._id}>
                <td>{codeSnippet.username}</td>
                <td>{codeSnippet.language}</td>
                <td>{codeSnippet.stdin}</td>
                <td>{codeSnippet.timestamp}</td>
                <td>
                  {codeSnippet.source_code
                    ? codeSnippet.source_code.substring(0, 100)
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CodeSnippetTable;
