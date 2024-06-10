import { useState } from "react";
import "./App.css";

function App() {
  const [inputFile, setInputFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [filename, setFilename] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", inputFile);
    const url = "http://localhost:5000/upload";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.status === "ok") {
      setUploadStatus((prev) => !prev);
    }
  };

  const getPhoto = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/get-file?filename=${filename}`;
    const response = await fetch(url);
    const data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    setImageUrl((prevValue) => imageUrl);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="file"
            type="file"
            onChange={(e) => {
              setInputFile(e.target.files[0]);
            }}
          />
          <input type="submit" />
        </form>
      </div>
      <div>{uploadStatus ? "Upload success" : ""}</div>
      <div>
        <form onSubmit={getPhoto}>
          <input
            type="text"
            onChange={(e) => setFilename(e.target.value)}
            name="filename"
          />
          <input type="submit" value="get file" />
        </form>
        <img src={imageUrl} alt="sample-img" />
      </div>
    </div>
  );
}

export default App;
