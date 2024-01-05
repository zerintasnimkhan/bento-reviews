import React, { useState } from "react";
import { Image, Typography } from 'antd';

const { Title } = Typography;

const items = [
      {
        subject: "Chowmein",
        image: "https://www.chilitochoc.com/wp-content/uploads/2021/03/Desi-Chow-Mein-2.jpg",
      },
      {
        subject: "Fried Calamari",
        image:
          "https://www.willcookforsmiles.com/wp-content/uploads/2021/07/Calamari-6-768x1152.jpg",
      },
  
    ];

const Reviews = () => {
  
const [currentItem, setCurrentItem] = useState(0);
const product = items[currentItem];
//const [liked, setLiked] = useState(false);
//const [disliked, setDisliked] = useState(false);

const handleNext = () => {
      setCurrentItem((prevItem) => (prevItem === foodItems.length - 1 ? 0 : prevItem + 1));
    };
  
    const handlePrev = () => {
      setCurrentItem((prevItem) => (prevItem === 0 ? foodItems.length - 1 : prevItem - 1));
    };
  
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Image src={product.image} alt={product.subject} preview={false} />
        <Title level={4} style={{ marginTop: '10px' }}>
          {product.subject}
        </Title>
        <div>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    );
  };
  
  export default Reviews;