import {
  useFeedback,
  getSortedAndFilteredFeedbacks,
} from "../store/FeedbackContext";
import FeedbackItem from "./FeedbackItem";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const FeedbackList = () => {
  const { state, dispatch } = useFeedback();
  const sortedAndFilteredFeedbacks = getSortedAndFilteredFeedbacks(
    state.feedbacks,
    state.sortBy,
    state.filterBy
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = state.feedbacks.findIndex((f) => f.id === active.id);
      const newIndex = state.feedbacks.findIndex((f) => f.id === over.id);

      dispatch({
        type: "REORDER",
        payload: { oldIndex, newIndex },
      });
    }
  };

  if (sortedAndFilteredFeedbacks.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        No feedback yet. Be the first to add one!
      </motion.p>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedAndFilteredFeedbacks.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="feedback-list">
          <AnimatePresence>
            {sortedAndFilteredFeedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <FeedbackItem feedback={feedback} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default FeedbackList;
