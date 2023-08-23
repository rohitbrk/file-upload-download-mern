const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    cb(null, "sample" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage, dest: "/" });

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/images", upload.single("image"), (req, res) => {
  // console.log(req.file);
  res.json({ status: "ok" });
});

app.get("/get-image", (req, res) => {
  res.sendFile(__dirname + "/assets/sample.jpg");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
