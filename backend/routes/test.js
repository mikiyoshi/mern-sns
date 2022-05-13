const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');

const upload2 = multer({ dest: 'img/' });

router.get('/img/:imageName', (req, res) => {
  // do a bunch of if statements to make sure the user is
  // authorized to view this image, then

  const imageName = req.params.imageName;
  console.log('test.js: ', imageName);
  const readStream = fs.createReadStream(`img/${imageName}`);
  console.log('test.js: ', readStream);
  readStream.pipe(res);
});

router.post('/img', upload2.single('image2'), (req, res) => {
  const imagePath = `test/${req.file.path}`;
  // const description = req.body.description;
  // const description = req.body.description;

  // Save this data to a database probably

  console.log('file: ', req.file);
  console.log(imagePath);
  res.send({ imagePath });
});
module.exports = router;

// router.listen(8080, () => console.log('listening on port 8080'));
