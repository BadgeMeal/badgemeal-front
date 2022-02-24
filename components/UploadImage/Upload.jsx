import React, { useState } from 'react';
import { Layout, Container, BoxUpload, ImagePreview } from './styles';
import FolderIcon from '../../assets/folder_icon_transparent.png';
import axios from 'axios';
import { stepContentClasses } from '@mui/material';
import { useWalletData } from '@data/wallet';

function App() {
  const [image, setImage] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState('');
  const [content, setContent] = useState('');
  const [walletData, mutateWalletData] = useWalletData();

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('address', walletData.account);
    formData.append('image', content);

    const response = await axios.post('http://tostit.i234.me:5005/api/verify/receipt', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  return (
    <Layout>
      <Container>
        <h2>Upload your image</h2>
        <BoxUpload>
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img src={FolderIcon} draggable={'false'} alt="placeholder" style={{ width: 100, height: 100 }} />
                  <p style={{ color: '#444' }}>Click to upload image</p>
                </label>

                <input id="upload-input" type="file" accept=".jpg,.jpeg,.gif,.png" onChange={handleImageChange} />
              </>
            ) : (
              <ImagePreview>
                {typeFile.includes('video') ? (
                  <video id="uploaded-image" src={image} draggable={false} controls autoPlay alt="uploaded-img" />
                ) : (
                  <img id="uploaded-image" src={image} draggable={false} alt="uploaded-img" />
                )}
              </ImagePreview>
            )}
          </div>
        </BoxUpload>

        {isUploaded ? <h2>Type is {typeFile}</h2> : null}
        <button type="button" onClick={onSubmit}>
          전송
        </button>
      </Container>
    </Layout>
  );
}

export default App;
