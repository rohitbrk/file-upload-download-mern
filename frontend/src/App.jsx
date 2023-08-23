import { useState } from "react";
import "./App.css";

function App() {
  const [inputFile, setInputFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", inputFile);
    const url = "http://localhost:5000/images";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.status === "ok") {
      setUploadStatus((prev) => !prev);
    }
    // console.log(data);
  };

  const getPhoto = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/get-image";
    const response = await fetch(url);
    const data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    setImageUrl((prevValue) => imageUrl);
    // console.log(data);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="image"
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
          <input type="submit" value="get file" />
        </form>
        <img src={imageUrl} alt="sample-img" />
      </div>
    </div>
  );
}

export default App;
