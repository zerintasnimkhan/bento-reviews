import { motion, useMotionValue, useTransform } from "framer-motion";
import { Image } from "antd"

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
            x,
            position: "absolute",
            width: "100%",
            height: "100%",
            cursor: "grab",
          }}
          onDragEnd={handleDragEnd}
        >
          <Image style={{ height: "600px", width: "400px" }} src={item.image} alt={item.subject} preview={false} />
          <div style={{ color: "white", fontSize: "180%", fontWeight: "900", fontStyle: "italic", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -100%)"}}>{item.subject}</div> 
        </motion.div>
      );
    };
    
    export default SwipableCard;