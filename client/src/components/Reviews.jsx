import React, { useState } from "react";
import { Button } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import SwipableCard from "./SwipableCard";
import sendFeedbackToBackend from "../services/review.service";

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
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setLiked(true);
      setDisliked(false);
    } else if (direction === "left") {
      setDisliked(true);
      setLiked(false);
    }

    const feedbackData = {
      item: items[currentItem],
      liked,
      disliked,
    };
    sendFeedbackToBackend(feedbackData);

  setCurrentItem((currentItem) =>
    currentItem === items.length - 1 ? 0 : currentItem + 1
  );
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 style={{ paddingLeft: "10px" }}>Give your feedback</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SwipableCard
            item={items[currentItem]}
            onSwipe={handleSwipe}
            style={{ height: "300px" }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>{/* Your SwipableCard component */}</div>
        <div style={{ marginTop: "20px" }}>
          <Button
            type={disliked ? "danger" : "default"}
            shape="circle"
            icon={disliked ? <DislikeFilled /> : <DislikeOutlined />}
            size="large"
            onClick={() => handleSwipe("left")}
            style={{ marginLeft: "16px" }}
          />
          <Button
            type={liked ? "primary" : "default"}
            shape="circle"
            icon={liked ? <LikeFilled /> : <LikeOutlined />}
            size="large"
            onClick={() => handleSwipe("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
