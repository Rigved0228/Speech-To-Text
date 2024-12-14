import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { PlayIcon, PauseIcon, ArrowPathIcon, ArrowDownTrayIcon, MicrophoneIcon } from "@heroicons/react/24/solid";

const App = () => {
  const {
    transcript,
    interimTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    console.log("Transcript:", transcript);
    console.log("Interim Transcript:", interimTranscript);
    console.log("Listening:", listening);
  }, [transcript, interimTranscript, listening]);

  const startListening = () => {
    console.log("Starting speech recognition...");
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const stopListening = () => {
    console.log("Stopping speech recognition...");
    SpeechRecognition.stopListening();
  };

  const clearTranscript = () => {
    console.log("Resetting transcript...");
    resetTranscript();
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transcript.txt";
    link.click();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-teal-400">
        Speech to Text
      </h1>

      <div className="w-3/4 max-w-2xl bg-gray-800 shadow-lg rounded p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-semibold">
            Microphone:{" "}
            {listening ? (
              <span className="text-green-400">On</span>
            ) : (
              <span className="text-red-400">Off</span>
            )}
          </p>

          {/* Conditional Recording Icon */}
          {listening && (
            <div className="flex items-center space-x-2">
              <MicrophoneIcon className="h-6 w-6 text-red-500 animate-pulse" />
              <span className="text-sm text-red-500">Recording...</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Use the controls below to manage speech recognition.
        </p>

        {/* Button Section */}
        <div className="flex justify-between mb-4">
          <button
            onClick={startListening}
            className="bg-teal-500 text-gray-900 p-3 rounded hover:bg-teal-600 flex items-center justify-center"
            aria-label="Start"
          >
            <PlayIcon className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={stopListening}
            className="bg-red-500 text-gray-900 p-3 rounded hover:bg-red-600 flex items-center justify-center"
            aria-label="Pause"
          >
            <PauseIcon className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={clearTranscript}
            className="bg-yellow-500 text-gray-900 p-3 rounded hover:bg-yellow-600 flex items-center justify-center"
            aria-label="Reset"
          >
            <ArrowPathIcon className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={downloadTranscript}
            className="bg-green-500 text-gray-900 p-3 rounded hover:bg-green-600 flex items-center justify-center"
            aria-label="Download"
          >
            <ArrowDownTrayIcon className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Transcript Display with Textarea */}
        <textarea
          className="w-full border border-gray-700 rounded p-4 bg-gray-700 text-gray-300 h-48 overflow-y-auto text-sm"
          value={transcript || interimTranscript}
          placeholder="Your transcript will appear here..."
          readOnly
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </div>
  );
};

export default App;
