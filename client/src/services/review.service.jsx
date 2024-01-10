const sendFeedbackToBackend = async (feedbackData) => {
      try {
        const response = await fetch("http://localhost:3000/review/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        });
    
        if (!response.ok) {
          throw new Error("Failed to save feedback");
        }
    
        console.log("Feedback saved successfully!");
      } catch (error) {
        console.error("Error saving feedback:", error.message);
      }
    };
    