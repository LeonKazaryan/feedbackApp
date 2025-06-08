import { useFeedback } from "../store/FeedbackContext";
import { getWeeklyStats } from "../store/FeedbackContext";
import { motion } from "framer-motion";

const FeedbackStats = () => {
  const { state } = useFeedback();
  const stats = getWeeklyStats(state.feedbacks);

  return (
    <motion.div
      className="feedback-stats-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Weekly Stats</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <h3>{stats.totalIdeas}</h3>
          <p>New Ideas</p>
        </div>
        <div className="stat-item">
          <h3>{stats.totalVotes}</h3>
          <p>Total Votes</p>
        </div>
        <div className="stat-item">
          <h3>{stats.popularIdeas}</h3>
          <p>Popular Ideas</p>
        </div>
        <div className="stat-item">
          <h3>{stats.averageVotesPerIdea}</h3>
          <p>Avg Votes/Idea</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackStats;
