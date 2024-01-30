import { motion, useMotionValue } from "framer-motion";
import { Image } from "antd";

const Card = ({item, onSwipe}) => {
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
    <>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{cursor:"grab"}}
      >
        <div style={{textAlign:"center", fontFamily:"proximanova"}}>
          <p>How was the</p>
          <h2>{item.subject}?</h2>
        </div>
        <div>
          <img
            style={{ width: "80%", height: "55vh", display:"block", marginLeft:"auto", marginRight:"auto", filter: "brightness(85%)"}}
            src={item.image}
            alt={item.subject}
            preview={false}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Card;