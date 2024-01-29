import React, { useState } from "react";
import { Button, Flex } from "antd";
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
  orderId: "1",
  restaurantId: "1",
  restaurantLiked: true,
  chefId: "1",
  waiterId: "1",
  chefLiked: false,
  waiterLiked: true,
  foods: [
    {
      foodId: "1",
      subject: "Chowmein",
      image:
        "https://www.chilitochoc.com/wp-content/uploads/2021/03/Desi-Chow-Mein-2.jpg",
    },
    {
      foodId: "2",
      subject: "Fried Calamari",
      image:
        "https://www.willcookforsmiles.com/wp-content/uploads/2021/07/Calamari-6-768x1152.jpg",
    },
    {
      foodId: "3",
      subject: "Prawn Tempura",
      image:
        "https://www.crunchycreamysweet.com/wp-content/uploads/2020/01/shrimp-tempura-A.jpg",
    },
    {
      foodId: "4",
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
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h1>Thank you for your review.</h1>
        </div>
      ) : (
        <Flex
          gap="middle"
          vertical
          style={{ flexDirection: "column", width: "100%" }}
        >
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2
              style={{
                marginLeft: "30vw",
                marginTop: "30vh",
                marginBottom: "-4vh",
              }}
            >
              How was your
            </h2>
            <Flex style={{ direction: "column" }}>
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
                <div
                  style={{
                    marginTop: "660px",
                    marginLeft: "35vw",
                    marginBottom: "-40vh",
                  }}
                >
                  <Button
                    type={disliked ? "danger" : "default"}
                    shape="circle"
                    icon={disliked ? <DislikeFilled /> : <DislikeOutlined />}
                    size="large"
                    onClick={() => handleSwipe("left")}
                    style={{ width: "4rem", height: "4rem" }}
                  />
                  <Button
                    type={liked ? "primary" : "default"}
                    shape="circle"
                    icon={liked ? <LikeFilled /> : <LikeOutlined />}
                    size="large"
                    style={{ marginLeft: "2vw", width: "4rem", height: "4rem" }}
                    onClick={() => handleSwipe("right")}
                  />
                </div>
                {/* <div><p>zerin</p></div> */}
              </div>
            </Flex>
          </div>
          {/* <div>
            <p style={{marginTop:"20vh"}}>swipe left to</p>
          </div>  */}
        </Flex>
      )}
    </div>
  );
};

export default Reviews;
