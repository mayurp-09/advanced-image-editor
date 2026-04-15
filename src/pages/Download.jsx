import { useLocation, useNavigate } from "react-router-dom";

const Download = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const imageData = location.state?.imageData;

  return (
  <div className="min-h-screen flex flex-col p-4 gap-4 bg-gradient-to-br from-blue-200 via-purple-300 to-pink-200 text-gray-800">

    {/* TOP BAR */}
    <div className="flex items-center justify-between bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl px-6 py-3 shadow-md">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
        🖼️ Choose Image</button>
      <h1 className="text-2xl font-bold bg-gradient-to-bl from-purple-600 to-pink-500 bg-clip-text text-transparent">
        Advanced Image Editor</h1>
      <button
        onClick={() => navigate("/editor", {state: { imageUrl: imageData }})}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
        ⬅️ Back to Editor</button>
    </div>

    {/* CONTENT */}
    <div className="flex flex-1 items-center justify-center">
      {imageData && (
        <div className="bg-white/80 backdrop-blur-lg border border-gray-300 rounded-2xl p-4 shadow-xl flex 
        flex-col items-center gap-4">
          {/* Image Preview */}
          <img
            src={imageData}
            alt="Edited"
            className="max-w-[700px] max-h-[500px] rounded-lg"/>
          {/* Download Button */}
          <a
            href={imageData}
            download="edited-image.png"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2">
            📥 Download</a>
        </div>
      )}
    </div>
  </div>
);
};

export default Download;