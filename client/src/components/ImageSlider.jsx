import React, { useState } from "react";
import { Carousel, Button, Row, Col, message } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const images = [
    "https://www.chilitochoc.com/wp-content/uploads/2021/03/Desi-Chow-Mein-2.jpg",
    "https://www.crunchycreamysweet.com/wp-content/uploads/2020/01/shrimp-tempura-A.jpg",
    "https://www.willcookforsmiles.com/wp-content/uploads/2021/07/Calamari-6-768x1152.jpg",
    "https://www.joyousapron.com/wp-content/uploads/2020/03/Easy-Chicken-Fried-Rice-Pic-4.jpg",
  ];

  const carouselRef = React.createRef();

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
      message.success("Liked!");
      nextImage();
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setLiked(false);
      message.error("Disliked!");
      nextImage();
    }
  };

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    setLiked(false);
    setDisliked(false);

    if (carouselRef.current) {
      carouselRef.current.goTo(currentImage, true);
    }
  };

  return (
    <div style={{ justifycontent: "center" }}>
      <h1 style={{ paddingLeft: "100px" }}>Give your feedback</h1>
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <Row justify="center">
          <Col span={24}>
            <Carousel
              ref={carouselRef}
              autoplay={false}
              dotPosition="bottom"
              initialSlide={nextImage}
            >
              {images.map((imageUrl, index) => (
                <div
                  key={index}
                  style={{
                    justifyContent: "center",
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Slide ${index}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      height: "600px",
                      width: "500px",
                      justifyContent: "center",
                      paddingLeft: "80px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "16px" }}>
          <Col>
            <Button
              type={disliked ? "danger" : "default"}
              shape="circle"
              icon={disliked ? <DislikeFilled /> : <DislikeOutlined />}
              size="large"
              onClick={handleDislike}
              style={{ marginLeft: "16px" }}
            />
          </Col>
          <Col>
            <Button
              type={liked ? "primary" : "default"}
              shape="circle"
              icon={liked ? <LikeFilled /> : <LikeOutlined />}
              size="large"
              onClick={handleLike}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ImageSlider;
