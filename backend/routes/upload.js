const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname); // it's for postman
    // console.log('GGGGGGGGGGGGGGGGet from Share.jsx: ', file.originalname);
    console.log('XXXXXXXXXXXXXXXGet from Share.jsx: ', req.body.name);
    // cb(null, Date.now() + file.originalname);
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
// const upload = multer({
//   dest: 'public/images/',
//   rename: function (fieldname, filename, req, res) {
//     //このreturnした文字列がファイル名になる。ここで拡張子は含めない。
//     return Date.now() + filename;
//   },
// });

// upload images API
router.post('/', upload.single('file'), (req, res) => {
  try {
    console.log('file: ', req.file);
    return res.status(200).json('success image upload');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
