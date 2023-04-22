import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './FileUpload.css'



export default function FileUpload({ contract, provider, account }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const resFile = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          maxBodyLength: "Infinity",
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            pinata_api_key: "9d13d62796fbc5f5f6f1",
            pinata_secret_api_key: '9921ead5ea4758a08f2aa5034b24a35c83fce38ee644fd0c170f70a2b6e27699',
          }
        });
        const ipfsHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, ipfsHash);
        alert("File uploaded successfully");
        setFile(null);
        setFileName("No image selected");

      } catch {
        alert("Error in uploading file")
      }
    }
  }
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    }
    setFileName(e.target.files[0].name);
    e.preventDefault();
  }
  return (
    <div className='top'>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className='choose'>
          Choose Image
        </label>
        <input disabled={!account} type="file" id='file-upload' name='data' onChange={retrieveFile} />
        <span className='textArea'>Image: {fileName}</span>
        <button type='submit' className='upload' disabled={!file}>Upload</button>
      </form>
    </div>
  )
}
