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
import { useSearchParams } from "react-router-dom";

const FeedbackPos = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [orderDetailsPos, setOrderDetailsPos] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviewedData, setReviewedData] = useState({
    userId: "",
    orderId: "",
    restaurantId: "",
    restaurantLiked: false,
    waiterLiked: false,
    deliveryLiked: false,
    foodReviews: [],
  });

  const posUrl = import.meta.env.VITE_REVIEW_BASE_URL + "/orderDetails/pos/";

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    fetch(posUrl + orderId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrderDetailsPos(data);
      })
      .catch((error) => console.error("Error fetching data from POS:", error));
  }, [posUrl, orderId]);

  const items = orderDetailsPos ? orderDetailsPos.foods : [];

  const restName = orderDetailsPos ? orderDetailsPos.restaurantName : "";
  const orderTime = orderDetailsPos ? orderDetailsPos.orderTime : "";
  const handleSwipe = (direction) => {
    const updatedData = { ...reviewedData };

    updatedData.orderId = orderId;
    updatedData.userId = "pos-user";
    updatedData.restaurantId = orderDetailsPos.restaurantId;

    if (direction === "right") {
      setLiked(true);
      items[currentItem].isLiked = true;
      setDisliked(false);

      if (items[currentItem].subject === "restaurant") {
        updatedData.restaurantLiked = true;
      }

      if (items[currentItem].subject === "waiter") {
        updatedData.waiterLiked = true;
      }

      if (items[currentItem].subject === "delivery") {
        updatedData.deliveryLiked = true;
      }
    } else if (direction === "left") {
      setDisliked(true);
      items[currentItem].isLiked = false;
      setLiked(false);
    }

    if (items[currentItem].subject === "food") {
      updatedData.foodReviews.push({
        foodId: items[currentItem].id,
        isLiked: items[currentItem].isLiked,
      });
    }

    setReviewedData(updatedData);

    if (currentItem === items.length - 1) {
      sendFeedbackToBackend(updatedData);
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
        <div style={{ marginTop: "10vh" }}>
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
            <Card
              item={items[currentItem]}
              onSwipe={handleSwipe}
              reviewedData={reviewedData}
            />
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
              You ordered from {restName} on{" "}
              {new Date(orderTime).toLocaleDateString()}.
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

export default FeedbackPos;
