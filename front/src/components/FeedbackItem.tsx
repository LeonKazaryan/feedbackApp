import { useFeedback } from "../store/FeedbackContext";
import type { Feedback } from "../store/FeedbackContext";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface FeedbackItemProps {
  feedback: Feedback;
}

const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  const { dispatch } = useFeedback();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: feedback.id,
    data: feedback,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <motion.div className="feedback-item" whileHover={{ scale: 1.01 }}>
        <div className="drag-handle" {...listeners}>
          ⋮⋮
        </div>
        <div className="feedback-content">
          <p>{feedback.text}</p>
          <div className="feedback-stats">
            <span>👍 {feedback.likes}</span>
            <span>👎 {feedback.dislikes}</span>
          </div>
        </div>
        <div className="feedback-actions">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              dispatch({
                type: "VOTE",
                payload: { id: feedback.id, voteType: "like" },
              })
            }
            className="vote-btn"
          >
            👍
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              dispatch({
                type: "VOTE",
                payload: { id: feedback.id, voteType: "dislike" },
              })
            }
            className="vote-btn"
          >
            👎
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#ff0000" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: "REMOVE", payload: feedback.id })}
            className="delete-btn"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackItem;
