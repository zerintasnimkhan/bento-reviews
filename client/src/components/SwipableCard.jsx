import { motion, useMotionValue, useTransform } from "framer-motion";
import { Image } from "antd";

const SwipableCard = ({ item, onSwipe }) => {
  const x = useMotionValue(0);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 150) {
      // Swipe right (like)
      onSwipe("right");
    } else if (info.offset.x < -150) {
      // Swipe left (dislike)
      onSwipe("left");
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{
        position: "absolute",
        cursor: "grab",
      }}
      onDragEnd={handleDragEnd}
    >
      <div>
        <p
          style={{
            marginLeft: "100vw",
            marginTop: "5vh",
            fontWeight: "bolder",
            fontSize: "1.8rem",
          }}
        >
          {item.subject}?
        </p>
      </div>
      <Image
        style={{ width: "80vw", height: "520px", marginLeft: "100vw" }}
        src={item.image}
        alt={item.subject}
        preview={false}
      />
    </motion.div>
  );
};

export default SwipableCard;
