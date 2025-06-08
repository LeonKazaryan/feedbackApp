import { useState } from "react";
import { motion } from "framer-motion";
import { useFeedback } from "../store/FeedbackContext";
import { initOpenAI, generateFeedback } from "../services/openai";

const AIFeedbackGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { dispatch } = useFeedback();

  const handleInitialize = () => {
    const apiKey = prompt("Please enter your OpenAI API key:");
    if (apiKey) {
      try {
        initOpenAI(apiKey);
        setIsInitialized(true);
      } catch (error) {
        alert("Failed to initialize OpenAI. Please check your API key.");
      }
    }
  };

  const handleGenerate = async () => {
    if (!isInitialized) {
      handleInitialize();
      return;
    }

    setIsGenerating(true);
    try {
      const { text, likes, dislikes } = await generateFeedback();

      dispatch({
        type: "ADD_WITH_STATS",
        payload: {
          text,
          likes,
          dislikes,
          date: Date.now(),
        },
      });
    } catch (error) {
      alert("Failed to generate feedback. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      className="ai-generator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={isGenerating}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isGenerating ? (
          <span className="loading">Generating AI Feedback... 🤖</span>
        ) : (
          <>Generate AI Feedback 🤖</>
        )}
      </motion.button>
    </motion.div>
  );
};

export default AIFeedbackGenerator;
