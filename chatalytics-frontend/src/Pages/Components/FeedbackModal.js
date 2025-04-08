
function FeedbackModel ({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Feedback</h2>
        <textarea
          className="w-full h-32 border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Your feedback..."
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={onClose}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default FeedbackModel;