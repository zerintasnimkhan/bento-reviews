import React, { useState, useEffect } from "react";
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
  userId: "65d1b671c4cce0bc0d348f17",
  orderId: "65d75617b3b361b7e8a457ce",
  restaurantId: "1",
  foods: [
    {
      subject: "food",
      id: "7f001a6e9c9d874c1c41106e",
      name: "Fish and Chips",
      image:
        "https://foodishjs.netlify.app/assets/images/seafood/seafood49.jpg",
    },
    {
      id: "1",
      subject: "restaurant",
      name: "Wild Thyme",
      image:
        "http://res.cloudinary.com/dsuiwxwkg/image/upload/v1707911996/pzmassjwhqvrz0oozr0z.jpg",
    },
    {
      id: "devlivery-man-id",
      subject: "delivery",
      name: "Delivery Service",
      image: "dummy img url",
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
  const [orderDetailsMarketPlace, setOrderDetailsMarketPlace] = useState();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
      fetch("https://bento-reviews-crabypatty.koyeb.app/orderDetails/marketplace/")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setOrderDetailsMarketPlace(data);
        })
        .catch((error) =>
          console.error("Error fetching data from MarketPlace:", error)
        );
    }, []);
    console.log(orderDetailsMarketPlace, "from state");

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
          style={{ marginTop: "-20vh" }}
        >
          <Lottie options={defaultOptions} height={400} width={400} />
          <h1
            style={{
              margin: "auto",
              textAlign: "center",
              fontFamily: "proximanova",
              marginLeft: "10vw",
              marginRight: "10vw",
            }}
          >
            Thank you for your feedback!
          </h1>
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
          <div
            style={{
              textAlign: "center",
              fontFamily: "proximanova",
              marginLeft: "10vw",
              marginRight: "10vw",
            }}
          >
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
          <div style={{ textAlign: "center", color: "grey" }}>
            <p>Swipe right to like, and left to dislike</p>
          </div>
        </Flex>
      )}
    </div>
  );
};

export default Feedback;
