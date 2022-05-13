import { useState } from 'react';
import axios from 'axios';

export default function Test() {
  const [file2, setFile2] = useState();
  console.log('XXXXXXXXX Test.jsx: ', file2);
  // const [description, setDescription] = useState('');
  const [image2, setImage2] = useState();
  // console.log('XXXXXXXXX Share.jsx: ', image);

  const submit2 = async (event) => {
    event.preventDefault();
    // console.logo('File: ', file);
    try {
      const formData2 = new FormData();
      formData2.append('image2', file2);
      const result2 = await axios.post('/test/img', formData2, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImage2(result2.data.imagePath);
    } catch (err) {
      console.log('file get error', err);
    }
    // setImage(result.data.imagePath);
    // console.log('test', result.data);
  };

  return (
    <div className="Test">
      <h1>Test.jsx</h1>
      <form onSubmit={submit2}>
        <input
          filename={file2}
          onChange={(e) => setFile2(e.target.files[0])}
          type="file"
          accept=".png, .jpeg, .jpg"
        ></input>
        {/* <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        ></input> */}
        <button type="submit">Submit</button>
      </form>
      {image2 && <img src={image2} />}
    </div>
  );
}
