const sendFeedbackToBackend = async (feedbackData) => {
  try {
    console.log(feedbackData);
    const response = await fetch("https://bento-reviews-crabypatty.koyeb.app/reviews/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      console.error(
        "Server returned an error:",
        response.status,
        response.statusText
      );
      throw new Error("Failed to save feedback");
    }

    console.log("Feedback saved successfully!");
  } catch (error) {
    console.error("Error saving feedback:", error.message);
  }
};

export default sendFeedbackToBackend;
