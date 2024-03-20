import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CodeSnippetForm.module.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
function CodeSnippetForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    language: "",
    stdin: "",
    sourceCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${backendUrl}app/submit`, {
        username: formData.username,
        language: formData.language,
        stdin: formData.stdin,
        source_code: formData.sourceCode,
      })
      .then((response) => {
        console.log("Code snippet submitted successfully:", response.data);

        setFormData({
          username: "",
          language: "",
          stdin: "",
          sourceCode: "",
        });
        navigate("/entries");
      })
      .catch((error) => {
        console.error("Error submitting code snippet:", error);
      });
  };
  return (
    <div className={styles.formContainer}>
      <h2>Submit Code Snippet</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="language">Preferred Code Language:</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="">Select Language</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="stdin">Standard Input:</label>
          <input
            type="text"
            id="stdin"
            name="stdin"
            value={formData.stdin}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="sourceCode">Source Code:</label>
          <textarea
            id="sourceCode"
            name="sourceCode"
            value={formData.sourceCode}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CodeSnippetForm;
