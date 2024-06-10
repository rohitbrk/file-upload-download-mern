const express = require("express");
const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, dest: "/" });

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ status: "ok" });
});

app.get("/get-file", (req, res) => {
  const filename = req.query.filename;
  res.sendFile(__dirname + `/uploads/${filename}`);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
