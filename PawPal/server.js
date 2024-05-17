const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  res.send({ url: filePath });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
