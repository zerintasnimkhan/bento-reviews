import React, { useState } from "react";
import { Image,  Button} from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";

//const { Title } = Typography;

const items = [
  {
    subject: "Chowmein",
    image:
      "https://www.chilitochoc.com/wp-content/uploads/2021/03/Desi-Chow-Mein-2.jpg",
  },
  {
    subject: "Fried Calamari",
    image:
      "https://www.willcookforsmiles.com/wp-content/uploads/2021/07/Calamari-6-768x1152.jpg",
  },
  {
    subject: "Prawn Tempura",
    image:
      "https://www.crunchycreamysweet.com/wp-content/uploads/2020/01/shrimp-tempura-A.jpg",
  },
  {
    subject: "Fried Rice",
    image:
      "https://www.joyousapron.com/wp-content/uploads/2020/03/Easy-Chicken-Fried-Rice-Pic-4.jpg",
  },
];

const Reviews = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const product = items[currentItem];
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (!liked) {
     setLiked(true);
      setDisliked(false);
      setCurrentItem((currentItem) =>
      currentItem === items.length - 1 ? 0 : currentItem + 1
      );
      //nextImage();
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      //setDisliked(true);
      //setLiked(false);
      setCurrentItem((currentItem) =>
      currentItem === items.length - 1 ? 0 : currentItem + 1
      );
      //nextImage();
    }
  };
  /*const handleNext = () => {
      setCurrentItem((prevItem) => (prevItem === items.length - 1 ? 0 : prevItem + 1));
    };
  
const handlePrev = () => {
      setCurrentItem((prevItem) => (prevItem === 0 ? items.length - 1 : prevItem - 1));
    };*/

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ paddingLeft: "10px" }}>Give your feedback</h1>
      <div style={{ position: "relative", textAlign: "center", color: "white"}}>
      <Image style={{height: "600px", width: "400px"}} src={product.image} alt={product.subject} preview={false} />
      <div style={{ fontSize: "180%", fontWeight: "900", fontStyle: "italic", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -100%)"}}>{product.subject}</div> 

      </div>
      <div>
        <Button
          type={disliked ? "danger" : "default"}
          shape="circle"
          icon={disliked ? <DislikeFilled /> : <DislikeOutlined />}
          size="large"
          onClick={handleDislike}
          style={{ marginLeft: "16px" }}
        />
        <Button
          type={liked ? "primary" : "default"}
          shape="circle"
          icon={liked ? <LikeFilled /> : <LikeOutlined />}
          size="large"
          onClick={handleLike}
        />
      </div>
    </div>
  );
};

export default Reviews;
