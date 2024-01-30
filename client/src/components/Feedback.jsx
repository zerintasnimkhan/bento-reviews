import React, { useState } from "react";
import { Button, Flex } from "antd";
import Lottie from "react-lottie";
import animationData from "../../public/lottie/animationData.json";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import Card from "./Card";
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
    {
      foodId: "5",
      subject: "Service of your waiter",
      image:
        "https://img.freepik.com/premium-photo/close-up-young-waiter-stylish-uniform-carrying-exquisite-salad-client-beautiful-gourmet-restaurant-table-service-restaurant_180601-17348.jpg",
    },
    {
      foodId: "6",
      subject: "Restaurant",
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20230817/pngtree-many-plates-of-food-is-shown-on-tables-at-restaurant-image_13032063.jpg",
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

const Feedback = () => {
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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      {showThankYou ? (
        <div
          // style={{
          //   margin: "auto",
          //   width: "70%",
          //   textAlign: "center",
          //   fontFamily: "proximanova",
          //   // marginTop: "40vh",
          //   marginRight: "60vw"
          // }}
          style={{marginTop:"-20vh"}}
        >
          <Lottie options={defaultOptions} height={400} width={400} />
          <h1 style={{margin: "auto", textAlign:"center", fontFamily:"proximanova", marginLeft:"10vw", marginRight:"10vw"}}>Thank you for your feedback!</h1>
        </div>
      ) : (
        <Flex
          gap="middle"
          vertical
          style={{ flexDirection: "column", width: "100%" }}
        >
          <div>
            <Card item={items[currentItem]} onSwipe={handleSwipe} />
          </div>
          <div style={{ textAlign: "center", fontFamily:"proximanova", marginLeft:"10vw", marginRight:"10vw" }}>
            <p>
              You ordered this from "La Foodamante" restaurant in the evening
              yesterday.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
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
          <div style={{ textAlign: "center", color:"grey" }}>
            <p>Swipe right to like, and left to dislike</p>
          </div>
        </Flex>
      )}
    </div>
  );
};

export default Feedback;
