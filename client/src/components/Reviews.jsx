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
const reviewData = {
  userId: "asdasdasd",
  orderId: "assssasssssdssassswswdasd",
  restaurantId: "asdasdasd",
  restaurantLiked: true,
  chefId: "aqweqweqwe",
  waiterId: "34sdre",
  chefLiked: false,
  waiterLiked: true,
  foods: [
    {
      foodId: "qqwe22",
      subject: "Chowmein",
      image:
        "https://www.chilitochoc.com/wp-content/uploads/2021/03/Desi-Chow-Mein-2.jpg",
    },
    {
      foodId: "qqwe22",
      subject: "Fried Calamari",
      image:
        "https://www.willcookforsmiles.com/wp-content/uploads/2021/07/Calamari-6-768x1152.jpg",
    },
    {
      foodId: "qqwe22",
      subject: "Prawn Tempura",
      image:
        "https://www.crunchycreamysweet.com/wp-content/uploads/2020/01/shrimp-tempura-A.jpg",
    },
    {
      foodId: "qqwe22",
      subject: "Fried Rice",
      image:
        "https://www.joyousapron.com/wp-content/uploads/2020/03/Easy-Chicken-Fried-Rice-Pic-4.jpg",
    },
  ],
};

const items = reviewData.foods;

const reviewedData = {
  restaurantId: reviewData.restaurantId,
  userId: reviewData.userId,
  orderId: reviewData.orderId,
  waiterId: reviewData.waiterId,
  chefId: reviewData.chefId,
  restaurantLiked: reviewData.restaurantLiked,
  waiterLiked: reviewData.waiterLiked,
  chefLiked: reviewData.chefLiked,
};

const feedbackData = [];

const Reviews = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setLiked(true);
      items[currentItem].isLiked = true;
      setDisliked(false);
    } else if (direction === "left") {
      setDisliked(true);
      items[currentItem].isLiked = false;
      setLiked(false);
    }

    feedbackData.push(items[currentItem]);
    // sendFeedbackToBackend(feedbackData);

    if (currentItem === items.length - 1) {
      console.log(reviewedData);
      // Show thank you message and send feedback to backend
      reviewedData["foodReviews"] = feedbackData;
      sendFeedbackToBackend(reviewedData);
      setShowThankYou(true);
    }

    setCurrentItem((currentItem) =>
      currentItem === items.length - 1 ? setShowThankYou(true) : currentItem + 1
    );
  };

  return (
    <div>
      {showThankYou ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h1>Thank you for your review.</h1>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h1>Give your feedback</h1>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
      )}
    </div>
  );
};

export default Reviews;
