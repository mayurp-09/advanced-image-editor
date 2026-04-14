import { useLocation, useNavigate } from "react-router-dom";

const Download = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const imageData = location.state?.imageData;

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">

      <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Advanced Image Editor</h1>

      {imageData ? (
        <img
          src={imageData}
          alt="Edited"
          className="max-w-md rounded-xl shadow-md"
        />
      ) : (
        <p>No Image Found</p>
      )}

      <div className="flex gap-4">

        {/* Download */}
        <a
          href={imageData}
          download="edited-image.png"
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >📥 Download
        </a>

        {/* Back */}
        <button
          onClick={() => navigate("/editor")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>

      </div>
    </div>
  );
};

export default Download;