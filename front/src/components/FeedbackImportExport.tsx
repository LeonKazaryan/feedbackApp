import { useFeedback } from "../store/FeedbackContext";
import { motion } from "framer-motion";

const FeedbackImportExport = () => {
  const { state, dispatch } = useFeedback();

  const handleExport = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `feedback-data-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedState = JSON.parse(e.target?.result as string);
        dispatch({ type: "IMPORT_STATE", payload: importedState });
      } catch (error) {
        alert("Error importing file. Please make sure it's a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <motion.div
      className="feedback-import-export"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={handleExport} className="export-btn">
        Export Data
      </button>
      <label className="import-btn">
        Import Data
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: "none" }}
        />
      </label>
    </motion.div>
  );
};

export default FeedbackImportExport;
