import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeSnippetForm from "./component/CodeSnippetForm";
import CodeSnippetTable from "./component/CodeSnippetTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CodeSnippetForm />} />
        <Route path="/entries" element={<CodeSnippetTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
