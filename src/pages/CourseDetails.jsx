import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CourseDetails = () => {
  const [transcribe, setTranscribe] = useState("transcribe");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [transcriptData, setTranscriptData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Available languages that match your backend
  const availableLanguages = ["English", "Spanish", "French", "German", "Italian"];

  const processVideo = async () => {
    try {
      setLoading(true);
      setError("");
      setIsProcessing(true);
      
      // Fetch the video file
      const response = await fetch("/intro_to_blockchain.mp4");
      if (!response.ok) {
        throw new Error("Failed to load video file");
      }
      
      const blob = await response.blob();
      const file = new File([blob], "intro_to_blockchain.mp4", { type: "video/mp4" });

      // Create FormData for the API request
      const formData = new FormData();
      formData.append("video", file);
      
      // Add target languages (excluding English as it's the original)
      const targetLanguages = availableLanguages.filter(lang => lang !== "English");
      formData.append("targetLanguages", JSON.stringify(targetLanguages));

      // Call your backend API
      const res = await fetch("https://eduflix-i337.onrender.com/api/process-video", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      
      if (result.success) {
        setTranscriptData(result.data);
        console.log("Processing successful:", result.data);
      } else {
        throw new Error(result.error || "Processing failed");
      }
    } catch (err) {
      setError(`Processing failed: ${err.message}`);
      console.error("Processing error:", err);
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  // Auto-process video when component mounts
  useEffect(() => {
    processVideo();
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const handleTranscribeClick = () => {
    setTranscribe("transcribe");
    // If no data exists, trigger processing
    if (!transcriptData && !loading) {
      processVideo();
    }
  };

  const renderTranscriptContent = () => {
    if (loading || isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#26D0CE] mb-4"></div>
          <p className="text-gray-500 text-center">
            {isProcessing ? "Processing video... This may take a few minutes" : "Loading transcript..."}
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-4">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={processVideo}
            className="bg-[#26D0CE] text-white px-4 py-2 rounded-lg hover:bg-[#20B5B3] transition-colors"
          >
            Retry Processing
          </button>
        </div>
      );
    }

    if (!transcriptData) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500 mb-4">No transcript data available</p>
          <button
            onClick={processVideo}
            className="bg-[#26D0CE] text-white px-4 py-2 rounded-lg hover:bg-[#20B5B3] transition-colors"
          >
            Process Video
          </button>
        </div>
      );
    }

    // Display content based on selected language
    if (selectedLanguage === "English") {
      return (
        <div className="space-y-4">
          <h4 className="whitespace-pre-wrap leading-relaxed">
            {transcriptData.original?.text || "No transcript available"}
          </h4>
          {transcriptData.original?.duration && (
            <p className="text-sm text-gray-500">
              Duration: {Math.round(transcriptData.original.duration)}s
            </p>
          )}
        </div>
      );
    }

    // Display translated content
    const translation = transcriptData.translations?.[selectedLanguage];
    
    if (translation?.error) {
      return (
        <div className="text-center py-4">
          <p className="text-red-500">Translation error: {translation.error}</p>
          <button
            onClick={processVideo}
            className="mt-2 bg-[#26D0CE] text-white px-4 py-2 rounded-lg hover:bg-[#20B5B3] transition-colors"
          >
            Retry Translation
          </button>
        </div>
      );
    }

    if (!translation) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500">Translation not available for {selectedLanguage}</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h4 className="whitespace-pre-wrap leading-relaxed">{translation}</h4>
        <p className="text-sm text-gray-500">Translated to {selectedLanguage}</p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-start gap-8 flex-col md:flex-row justify-between">
        {/* Video Section */}
        <div className="w-full md:w-[65%] md:h-[300px] lg:h-[370px] bg-[#dadada] shadow rounded-2xl">
          <div className="w-[90%] mx-auto md:w-full h-full py-1">
            <video 
              width="100%" 
              height="auto" 
              controls
              className="rounded-xl"
            >
              <source src="/intro_to_blockchain.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Transcript/Summary Panel */}
        <div className="w-full md:w-[35%] h-[59vh] bg-white shadow-2xl rounded-3xl py-4 overflow-y-auto">
          <div className="w-[90%] mx-auto">
            {/* Mode Selection Buttons */}
            <div className="flex items-center gap-x-4 mb-4">
              <button
                className={`text-sm md:text-base font-semibold rounded-3xl px-4 py-2 transition-colors ${
                  transcribe === "transcribe"
                    ? "bg-[#26D0CE] text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
                onClick={handleTranscribeClick}
              >
                Transcribe
              </button>
              <button
                className={`text-sm md:text-base font-semibold rounded-3xl px-4 py-2 transition-colors ${
                  transcribe === "summarize"
                    ? "bg-[#26D0CE] text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
                onClick={() => setTranscribe("summarize")}
              >
                Summarize
              </button>
            </div>

            {/* Content Area */}
            <div className="mt-4">
              {transcribe === "transcribe" && (
                <div>
                  {/* Language Selector */}
                  <div className="relative mb-4">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="font-semibold text-lg">{selectedLanguage}</h2>
                      <div
                        className="rounded-md border-2 border-[#dadada] px-2 py-1 cursor-pointer hover:border-[#26D0CE] transition-colors"
                        onClick={() => setIsOpen((prev) => !prev)}
                      >
                        <ChevronDown
                          className={`transform transition-transform duration-300 w-5 h-5 ${
                            isOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Language Dropdown */}
                    {isOpen && (
                      <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg w-[150px] py-2 z-10">
                        <div className="flex flex-col">
                          {availableLanguages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => handleLanguageSelect(lang)}
                              className={`px-4 py-2 text-left hover:bg-[#26D0CE] hover:text-white transition-colors ${
                                selectedLanguage === lang ? "bg-[#26D0CE] text-white" : "text-gray-700"
                              }`}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Transcript Content */}
                  <div className="mt-4">
                    {renderTranscriptContent()}
                  </div>
                </div>
              )}

              {transcribe === "summarize" && (
                <div className="w-full flex items-center justify-center py-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-400 mb-2">Coming Soon</h3>
                    <p className="text-gray-500">Summary feature will be available soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Debug Info (Remove in production) */}
      {transcriptData && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold mb-2">Processing Info:</h4>
          <p className="text-sm text-gray-600">
            Processed: {transcriptData.metadata?.processedAt}
          </p>
          <p className="text-sm text-gray-600">
            Available translations: {Object.keys(transcriptData.translations || {}).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;