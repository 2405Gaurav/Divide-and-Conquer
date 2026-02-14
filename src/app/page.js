"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroTexts = [
    { text: 'with anyone.', color: '#5a6670', icon: '✖️' },
    { text: 'on trips.', color: '#1cc29f', icon: '✈️' },
    { text: 'with housemates.', color: '#7c5cba', icon: '🏠' },
    { text: 'with groups.', color: '#e57398', icon: '❤️' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleIconClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] font-sans overflow-hidden flex flex-col lg:flex-row items-center relative">
      
      {/* --- Left Content --- */}
      <div className="w-full lg:w-5/12 px-6 py-12 lg:pl-24 lg:pr-8 z-10 flex flex-col items-start justify-center min-h-[50vh] lg:min-h-screen">
        
        {/* Heading: Reduced size per request (text-4xl/5xl instead of 72px) */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-8 tracking-tight">
          Less stress when<br />
          sharing expenses<br />
          <span 
            className="transition-colors duration-500 ease-in-out"
            style={{ color: heroTexts[currentIndex].color }}
          >
            {heroTexts[currentIndex].text}
          </span>
        </h1>

        {/* Icons */}
        <div className="flex gap-4 mb-8">
          {heroTexts.map((item, index) => (
            <button
              key={index}
              onClick={() => handleIconClick(index)}
              className={`
                w-14 h-14 flex items-center justify-center text-2xl rounded-2xl transition-all duration-300 ease-out
                ${currentIndex === index 
                  ? 'bg-white shadow-lg scale-110' 
                  : 'hover:bg-black/5 scale-100 grayscale opacity-70 hover:grayscale-0 hover:opacity-100'}
              `}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* Paragraph: Reduced size (text-lg instead of 26px) */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-md font-light leading-relaxed">
          Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.
        </p>

        {/* CTA Button */}
        <button 
          className="px-8 py-3 text-lg md:text-xl font-semibold text-white rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{ backgroundColor: heroTexts[currentIndex].color }}
        >
          Sign up
        </button>
      </div>

      {/* --- Right Content (Illustrations) --- */}
      <div className="w-full lg:w-7/12 relative h-[50vh] lg:h-screen flex items-center justify-center pointer-events-none">
        
        {/* Shape Container: Significantly larger dimensions */}
        <div className="relative w-full h-full max-w-[800px] max-h-[800px] flex items-center justify-center p-10">
          
          {/* Shape 0 - Gray (Anyone) */}
          <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentIndex === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl">
              <defs>
                <pattern id="triangles1" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <polygon points="0,0 20,0 10,17.32" fill="#5a6670"/>
                  <polygon points="10,17.32 20,0 30,17.32" fill="#7a8690"/>
                  <polygon points="20,0 40,0 30,17.32" fill="#6a7680"/>
                  <polygon points="0,0 10,17.32 0,34.64" fill="#7a8690"/>
                  <polygon points="10,17.32 20,34.64 0,34.64" fill="#8a96a0"/>
                  <polygon points="10,17.32 30,17.32 20,34.64" fill="#9aa6b0"/>
                </pattern>
              </defs>
              {/* Asterisk Shape */}
              <rect x="160" y="20" width="80" height="360" rx="4" ry="4" fill="url(#triangles1)" transform="rotate(0 200 200)" />
              <rect x="160" y="20" width="80" height="360" rx="4" ry="4" fill="url(#triangles1)" transform="rotate(60 200 200)" />
              <rect x="160" y="20" width="80" height="360" rx="4" ry="4" fill="url(#triangles1)" transform="rotate(-60 200 200)" />
            </svg>
          </div>

          {/* Shape 1 - Teal (Plane) */}
          <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentIndex === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl">
              <defs>
                <pattern id="triangles2" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <polygon points="0,0 20,0 10,17.32" fill="#1cc29f"/>
                  <polygon points="10,17.32 20,0 30,17.32" fill="#4dd4b5"/>
                  <polygon points="20,0 40,0 30,17.32" fill="#2ec9a7"/>
                  <polygon points="0,0 10,17.32 0,34.64" fill="#6de0c7"/>
                  <polygon points="10,17.32 20,34.64 0,34.64" fill="#8ee8d4"/>
                  <polygon points="10,17.32 30,17.32 20,34.64" fill="#0a9478"/>
                </pattern>
              </defs>
              <path d="M200 80 L360 200 L360 240 L200 180 L200 300 L260 340 L260 360 L200 340 L140 360 L140 340 L200 300 L200 180 L40 240 L40 200 Z" fill="url(#triangles2)"/>
            </svg>
          </div>

          {/* Shape 2 - Purple (House) */}
          <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentIndex === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl">
              <defs>
                <pattern id="triangles3" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <polygon points="0,0 20,0 10,17.32" fill="#7c5cba"/>
                  <polygon points="10,17.32 20,0 30,17.32" fill="#9d7dd4"/>
                  <polygon points="20,0 40,0 30,17.32" fill="#8a6bc7"/>
                  <polygon points="0,0 10,17.32 0,34.64" fill="#b49ee0"/>
                  <polygon points="10,17.32 20,34.64 0,34.64" fill="#c5b3e8"/>
                  <polygon points="10,17.32 30,17.32 20,34.64" fill="#6545a8"/>
                </pattern>
              </defs>
              <path d="M200 60 L360 200 L330 200 L330 360 L70 360 L70 200 L40 200 Z" fill="url(#triangles3)"/>
              <rect x="155" y="260" width="90" height="100" fill="#5a3d94"/>
            </svg>
          </div>

          {/* Shape 3 - Pink (Heart) */}
          <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentIndex === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl">
              <defs>
                <pattern id="triangles4" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <polygon points="0,0 20,0 10,17.32" fill="#e57398"/>
                  <polygon points="10,17.32 20,0 30,17.32" fill="#f098b8"/>
                  <polygon points="20,0 40,0 30,17.32" fill="#eb85a8"/>
                  <polygon points="0,0 10,17.32 0,34.64" fill="#f5b0c8"/>
                  <polygon points="10,17.32 20,34.64 0,34.64" fill="#fac5d8"/>
                  <polygon points="10,17.32 30,17.32 20,34.64" fill="#d85585"/>
                </pattern>
              </defs>
              <path d="M200 130 C200 95 165 70 130 70 C85 70 50 105 50 150 C50 220 200 340 200 340 C200 340 350 220 350 150 C350 105 315 70 270 70 C235 70 200 95 200 130 Z" fill="url(#triangles4)"/>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}