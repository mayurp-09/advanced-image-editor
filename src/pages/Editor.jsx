import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const Editor = () => {
  const location = useLocation();
  const imageUrl =
  location.state?.imageUrl || localStorage.getItem("originalImage");
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [filters, setFilters] = useState({
    brightness: { value: 100, min: 50, max: 150, unit: "%" },
    contrast: { value: 100, min: 70, max: 150, unit: "%" },
    saturation: { value: 100, min: 50, max: 150, unit: "%" },
    hueRotation: { value: 0, min: -30, max: 30, unit: "deg" },
    blur: { value: 0, min: 0, max: 3, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 80, unit: "%" },
    opacity: { value: 100, min: 70, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" }
  });
  // ✅ Load image once
  useEffect(() => {
    if (!imageUrl) { navigate("/") };
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
    };
  }, [imageUrl]);

  useEffect(() => {
  if (!image) return;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const maxWidth = 800;
  const maxHeight = 500;

  let width = image.width;
  let height = image.height;

  const ratio = Math.min(maxWidth / width, maxHeight / height);
  width = width * ratio;
  height = height * ratio;

  canvas.width = width;
  canvas.height = height;
  // ✅ IMPORTANT: set filter BEFORE drawing
  ctx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
  `;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);

}, [image, filters]);

const presets = {

  normal: {
    brightness:100, contrast:100, saturation:100,
    hueRotation:0, blur:0, grayscale:0,
    sepia:0, opacity:100, invert:0
  },

  drama: {
    brightness:110, contrast:135, saturation:120,
    hueRotation:0, blur:0, grayscale:0,
    sepia:10, opacity:100, invert:0
  },

  vintage: {
    brightness:105, contrast:90, saturation:80,
    hueRotation:10, blur:0, grayscale:0,
    sepia:40, opacity:100, invert:0
  },

  oldSchool: {
    brightness:95, contrast:85, saturation:75,
    hueRotation:0, blur:0.7, grayscale:20,
    sepia:50, opacity:100, invert:0
  },

  cinematic: {
    brightness:105, contrast:130, saturation:90,
    hueRotation:-10, blur:0, grayscale:0,
    sepia:5, opacity:100, invert:0
  },

  faded: {
    brightness:110, contrast:85, saturation:75,
    hueRotation:0, blur:0, grayscale:0,
    sepia:15, opacity:95, invert:0
  },

  cool: {
    brightness:100, contrast:110, saturation:105,
    hueRotation:-20, blur:0, grayscale:0,
    sepia:0, opacity:100, invert:0
  },

  warm: {
    brightness:105, contrast:110, saturation:115,
    hueRotation:20, blur:0, grayscale:0,
    sepia:15, opacity:100, invert:0
  },

  noir : {
    brightness:95, contrast:140, saturation:0,
    hueRotation:0, blur:0, grayscale:100,
    sepia:10, opacity:100, invert:0
  },

  softGlow : {
    brightness:110, contrast:90, saturation:105,
    hueRotation:0, blur:0.5, grayscale:0,
    sepia:10, opacity:100, invert:0
  },

  retroPop : {
    brightness:115, contrast:130, saturation:140,
    hueRotation:15, blur:0, grayscale:0,
    sepia:5, opacity:100, invert:0
  }
};

const applyPreset = (preset) => {
  const updated = { ...filters };

  Object.keys(preset).forEach((key) => {
    updated[key] = {
      ...updated[key],
      value: preset[key]
    };
  });

  setFilters(updated);
};

const handleContinue = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const imageData = canvas.toDataURL("image/jpeg", 0.9);
  localStorage.setItem("editedImage", imageData);
  navigate("/download");
};

 return (
  <div className="min-h-screen flex flex-col p-4 gap-4 bg-gradient-to-br from-blue-200 via-purple-300 to-pink-200 text-gray-800">
    {/*Top bar */}
    <div className="flex items-center justify-between bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl px-6 py-3 shadow-md">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
        🖼️ Choose Image</button>
      <h1 className="text-2xl font-bold bg-gradient-to-bl from-purple-600 to-pink-500 bg-clip-text text-transparent">
        Advanced Image Editor</h1>
      <button
        onClick={handleContinue}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
        ➡️ Continue</button>
    </div>
    {/* MAIN */}
    <div className="flex flex-1 gap-4">
      <div className="flex-[7] bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl flex items-center justify-center shadow-xl p-4">
        <canvas
        ref={canvasRef}
        className="max-w-full max-h-full rounded-lg"/>
      </div>

      {/* FILTER PANEL */}
      <div className="flex-[3] bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-5 flex flex-col gap-5 shadow-xl">
        <h2 className="font-semibold text-lg">🎛️ Filters:</h2>

        <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
          {Object.keys(filters).map((key) => {
            const filter = filters[key];
            return (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium capitalize flex justify-between">
                  <span>{key}</span>
                  <span>{filter.value}{filter.unit}</span>
                </label>

                <input
                  type="range"
                  min={filter.min}
                  max={filter.max}
                  value={filter.value}
                  className="w-full accent-purple-500 cursor-pointer"
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      [key]: {
                        ...filter,
                        value: Number(e.target.value)
                      }
                    })
                  }
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={() =>
            setFilters({
              brightness: { value: 100, min: 50, max: 150, unit: "%" },
              contrast: { value: 100, min: 70, max: 150, unit: "%" },
              saturation: { value: 100, min: 50, max: 150, unit: "%" },
              hueRotation: { value: 0, min: -30, max: 30, unit: "deg" },
              blur: { value: 0, min: 0, max: 5, unit: "px" },
              grayscale: { value: 0, min: 0, max: 100, unit: "%" },
              sepia: { value: 0, min: 0, max: 80, unit: "%" },
              opacity: { value: 100, min: 70, max: 100, unit: "%" },
              invert: { value: 0, min: 0, max: 100, unit: "%" }
            })
          }
          className="bg-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-400 transition">
          🔄 Reset
        </button>
      </div>
    </div>
    {/* PRESETS */}
    <div className="w-full">
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-2 shadow-xl">
        <h2 className="font-semibold mb-3">🪄 Presets:</h2>
        <div className="flex justify-between">
          {Object.keys(presets).map((name) => (
            <button
              key={name}
              onClick={() => applyPreset(presets[name])}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-bl from-purple-400 to-pink-400 text-white hover:scale-105 transition shadow capitalize">
              {name}
            </button>
          ))}
        </div>

      </div>
    </div>

  </div>
);
};

export default Editor;