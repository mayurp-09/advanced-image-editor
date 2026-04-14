import { useNavigate } from "react-router-dom";

const Upload = () => {
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        navigate("/editor", {state: { imageUrl }});
    };
   return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-purple-300
     to-pink-200">
      
     <h1 className="text-6xl font-extrabold mb-6 inline-block pb-2 leading-tight bg-gradient-to-bl from-blue-500 via-purple-600
      to-pink-500 bg-clip-text text-transparent">
     Advanced Image Editor</h1>

      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl flex flex-col items-center gap-6 w-96">
        
        <label className="w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col 
        items-center gap-4 hover:border-gray-400 hover:bg-blue-50 transition">
          
          <div className="text-5xl">📁</div>

          <p className="text-gray-600 text-sm text-center">
            Click to upload or drag & drop
          </p>

          <span className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
            Choose Image
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

      </div>

    </div>
  );
};

export default Upload;