const sendFeedbackToBackend = async (feedbackData) => {
  try {
    const reviewUrl = import.meta.env.VITE_REVIEW_LOCAL_URL + "/reviews/add";
    const response = await fetch(reviewUrl, {
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
