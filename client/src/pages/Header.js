import React from 'react'
import { useState, useEffect } from 'react';

export default function Header() {
    const [postInfo,setPostInfo] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5000/image`)
          .then(response => {
            response.json().then(postInfo => {
              // console.log(postInfo , "postinfo");
              setPostInfo(postInfo);
            });
          });
}, []);

console.log(postInfo);
  return (
    <>  
    <div>
      {postInfo && <img src={postInfo.image} alt="Cloudinary Image" />}
    </div>
       
    </>
  )
}
