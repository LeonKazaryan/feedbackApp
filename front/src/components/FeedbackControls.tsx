import { useFeedback } from "../store/FeedbackContext";
import type { SortType, FilterType } from "../store/FeedbackContext";

const FeedbackControls = () => {
  const { state, dispatch } = useFeedback();

  return (
    <div className="feedback-controls">
      <div className="control-group">
        <label>Sort by: </label>
        <select
          value={state.sortBy}
          onChange={(e) =>
            dispatch({ type: "SET_SORT", payload: e.target.value as SortType })
          }
        >
          <option value="date">Date</option>
          <option value="likes">Likes</option>
        </select>
      </div>

      <div className="control-group">
        <label>Filter: </label>
        <select
          value={state.filterBy}
          onChange={(e) =>
            dispatch({
              type: "SET_FILTER",
              payload: e.target.value as FilterType,
            })
          }
        >
          <option value="all">All</option>
          <option value="popular">Popular</option>
          <option value="new">New</option>
        </select>
      </div>
    </div>
  );
};

export default FeedbackControls;
