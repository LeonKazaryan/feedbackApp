import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

export interface Feedback {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
  date: number;
}

export type SortType = "date" | "likes";
export type FilterType = "all" | "popular" | "new";

interface FeedbackState {
  feedbacks: Feedback[];
  sortBy: SortType;
  filterBy: FilterType;
}

type FeedbackAction =
  | { type: "ADD"; payload: string }
  | { type: "REMOVE"; payload: number }
  | { type: "VOTE"; payload: { id: number; voteType: "like" | "dislike" } }
  | { type: "SET_SORT"; payload: SortType }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "REORDER"; payload: { oldIndex: number; newIndex: number } }
  | { type: "IMPORT_STATE"; payload: FeedbackState };

const initialState: FeedbackState = {
  feedbacks: [],
  sortBy: "date",
  filterBy: "all",
};

// Helper function to move array item
const arrayMove = <T,>(array: T[], from: number, to: number): T[] => {
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  );
  return newArray;
};

const feedbackReducer = (
  state: FeedbackState,
  action: FeedbackAction
): FeedbackState => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        feedbacks: [
          ...state.feedbacks,
          {
            id: Date.now(),
            text: action.payload,
            likes: 0,
            dislikes: 0,
            date: Date.now(),
          },
        ],
      };

    case "REMOVE":
      return {
        ...state,
        feedbacks: state.feedbacks.filter((f) => f.id !== action.payload),
      };

    case "VOTE":
      return {
        ...state,
        feedbacks: state.feedbacks.map((feedback) =>
          feedback.id === action.payload.id
            ? {
                ...feedback,
                likes:
                  action.payload.voteType === "like"
                    ? feedback.likes + 1
                    : feedback.likes,
                dislikes:
                  action.payload.voteType === "dislike"
                    ? feedback.dislikes + 1
                    : feedback.dislikes,
              }
            : feedback
        ),
      };

    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload,
      };

    case "SET_FILTER":
      return {
        ...state,
        filterBy: action.payload,
      };

    case "REORDER":
      return {
        ...state,
        feedbacks: arrayMove(
          state.feedbacks,
          action.payload.oldIndex,
          action.payload.newIndex
        ),
      };

    case "IMPORT_STATE":
      return action.payload;

    default:
      return state;
  }
};

const FeedbackContext = createContext<{
  state: FeedbackState;
  dispatch: React.Dispatch<FeedbackAction>;
} | null>(null);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  return (
    <FeedbackContext.Provider value={{ state, dispatch }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};

// Stats calculation helper
export const getWeeklyStats = (feedbacks: Feedback[]) => {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

  const weekFeedbacks = feedbacks.filter((f) => f.date >= oneWeekAgo);

  return {
    totalIdeas: weekFeedbacks.length,
    totalVotes: weekFeedbacks.reduce((acc, f) => acc + f.likes + f.dislikes, 0),
    popularIdeas: weekFeedbacks.filter((f) => f.likes > f.dislikes).length,
    averageVotesPerIdea: weekFeedbacks.length
      ? (
          weekFeedbacks.reduce((acc, f) => acc + f.likes + f.dislikes, 0) /
          weekFeedbacks.length
        ).toFixed(1)
      : 0,
  };
};

export const getSortedAndFilteredFeedbacks = (
  feedbacks: Feedback[],
  sortBy: SortType,
  filterBy: FilterType
) => {
  let filtered = [...feedbacks];

  // Apply filters
  switch (filterBy) {
    case "popular":
      filtered = filtered.filter((f) => f.likes > f.dislikes);
      break;
    case "new":
      filtered = filtered.filter(
        (f) => Date.now() - f.date < 24 * 60 * 60 * 1000
      );
      break;
  }

  // Apply sorting
  return filtered.sort((a, b) => {
    if (sortBy === "date") {
      return b.date - a.date;
    }
    return b.likes - b.dislikes - (a.likes - a.dislikes);
  });
};
