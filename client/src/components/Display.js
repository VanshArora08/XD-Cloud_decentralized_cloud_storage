import React from 'react'
import { useState } from 'react'
import './Display.css'

export default function Display({ contract, account }) {
  const [data, setData] = useState("")
  const getData = async () => {
    let dataArray;
    const otherAddress = document.querySelector('.address').value;
    if (otherAddress) {
      console.log("inside other address");
      dataArray = await contract.display(otherAddress);
      // console.log(dataArray);
    } else {
      console.log("inside self address");
      // console.log(account);
      dataArray = await contract.display(account);
    }
    const isEmpty = Object.keys(dataArray).length === 0;
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(',');
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
      console.log(str_array);
    } else {
      alert("No image to display");
    }
  }
  return (
    <>
      <div className="image-list">{data}</div>
      <input type="text" placeholder='Enter address' className='address' />
      <button className='center button' onClick={getData}>Get Data</button>

    </>
  )
}
