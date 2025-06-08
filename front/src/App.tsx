import "./App.css";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedBackList";
import { FeedbackProvider } from "./store/FeedbackContext";
import FeedbackControls from "./components/FeedbackControls";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackImportExport from "./components/FeedbackImportExport";
import AIFeedbackGenerator from "./components/AIFeedbackGenerator";
import { motion } from "framer-motion";

function App() {
  return (
    <FeedbackProvider>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Feedback App</h1>
        <FeedbackStats />
        <div className="controls-row">
          <FeedbackControls />
          <FeedbackImportExport />
        </div>
        <AIFeedbackGenerator />
        <FeedbackForm />
        <FeedbackList />
      </motion.div>
    </FeedbackProvider>
  );
}

export default App;
