const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');

const upload2 = multer({ dest: 'img/' });
// ここはいつでもルートから保存場所確定

router.get('/img/:imageName', (req, res) => {
  // /img/:imageName に注意
  // do a bunch of if statements to make sure the user is
  // authorized to view this image, then

  const imageName = req.params.imageName;
  console.log('test.js: ', imageName);
  const readStream = fs.createReadStream(`img/${imageName}`);
  // createReadStream はデータの読み込み
  // https://qiita.com/masakura/items/5683e8e3e655bfda6756
  // https://learntutorials.net/ja/node-js/topic/2974/%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%A0%E3%81%AE%E4%BD%BF%E7%94%A8
  // http://var.blog.jp/archives/83109131.html
  console.log('test.js: ', readStream);
  readStream.pipe(res);
});

router.post('/img', upload2.single('image2'), (req, res) => {
  const imagePath = `test/${req.file.path}`; // test/ に注意
  // const description = req.body.description;
  // const description = req.body.description;

  // Save this data to a database probably

  console.log('file: ', req.file);
  console.log(imagePath);
  res.send({ imagePath });
});
module.exports = router;

// router.listen(8080, () => console.log('listening on port 8080'));
