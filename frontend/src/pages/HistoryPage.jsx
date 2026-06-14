import { useEffect, useState } from "react";
import { getHistory } from "../services/historyService";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getHistory();

      console.log("History Data:", data);
      console.log("History Length:", data.length);

      setHistory(data);
    } catch (error) {
      console.error("History Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-purple-700">
            Consultation History
          </h1>

          <p className="text-gray-500">
            Review your previous healthcare consultations
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
        >
          Dashboard
        </button>

      </div>

      <div className="max-w-6xl mx-auto p-6">

        {history.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-semibold mb-2">
              No Consultation History
            </h2>

            <p className="text-gray-500">
              Start a consultation to see your history here.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {history.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-center mb-4">

                  <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-semibold">
                    {item.disease.toUpperCase()}
                  </span>

                  <span className="text-sm text-gray-400">
                    Consultation #{history.length - index}
                  </span>

                </div>

                <div className="mb-4">

                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    Question
                  </h3>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    {item.question}
                  </div>

                </div>

                <div>

                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    HealthBridge AI Response
                  </h3>

                  <div className="bg-green-50 p-4 rounded-lg whitespace-pre-wrap">
                    {item.response}
                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default HistoryPage;