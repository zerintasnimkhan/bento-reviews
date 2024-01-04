const {addReview, getAllReviews} = require("../models/review.model")


module.exports.createReview = async (req, res) => {
      try {
        console.log(req.body);
        const {
            userId, 
            comment, 
            ratings,  
            images
        } = req.body;
    
        if (!userId || !comment || !ratings) {
          return res.status(400).json();
        }
        const data = {
            userId, 
            comment, 
            ratings,  
            images
        };
    
        const savedReview = await addReview(data);
    
        res.status(201).json({ message: "Review added", review: savedReview });
      } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Server error"});
      }
    };


module.exports.fetchAllReviews = async (_req, res) => {
      try {
        const reviews = await getAllReviews();
        res.status(200).json(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
};

