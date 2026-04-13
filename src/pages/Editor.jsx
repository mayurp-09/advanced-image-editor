const Editor = () => {
  return (
    <div className="h-screen flex flex-col p-4 gap-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800">
      
      {/* TOP BAR */}
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">
          ✨ Image Editor
        </h1>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 gap-4">

        {/* CANVAS */}
        <div className="flex-1 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl flex items-center justify-center shadow-md">
          <p className="opacity-60 text-lg">No Image Selected</p>
          <canvas className="hidden"></canvas>
        </div>

        {/* FILTER PANEL */}
        <div className="w-64 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-4 flex flex-col gap-4 shadow-md">
          <h2 className="font-semibold text-lg">Filters</h2>

          <div className="flex flex-col gap-2 flex-1">
            <p className="text-sm text-gray-500">Filters coming...</p>
          </div>

          <button className="bg-blue-500 text-white font-medium py-2 rounded-lg hover:scale-105 transition">
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-md">
        <h2 className="font-semibold mb-2">Presets</h2>

        <div className="flex flex-wrap gap-2">
          <button className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:scale-105 transition">
            Preset
          </button>
        </div>
      </div>

    </div>
  );
};

export default Editor;