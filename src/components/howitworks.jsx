"use client";
import { ArrowDown } from "lucide-react";

export default function HowItWorks({id}) {
  const steps = [
    {
      step: "01",
      title: "Create your Circle",
      description: "Start by adding contacts or creating a group. Whether it's a trip to Bali or just daily apartment bills, set up the context in seconds.",
      route: "/groups & /contacts",
      color: "#7c5cba", // Purple (Groups)
      icon: "👥",
      align: "left"
    },
    {
      step: "02",
      title: "Add Expenses on the Fly",
      description: "Paid for dinner? specialized in 1-on-1 or group splits. Just enter the amount, select who was involved, and hit save. We handle the math.",
      route: "/expenses/new",
      color: "#1cc29f", // Teal (Action)
      icon: "💸",
      align: "right"
    },
    {
      step: "03",
      title: "Daily Reminders & Dashboard",
      description: "Never let a debt slide. Your dashboard gives you a snapshot of who owes you (and who you owe). We send friendly daily reminders so you don't have to be the bad guy.",
      route: "/dashboard",
      color: "#5a6670", // Gray (Neutral/Admin)
      icon: "🔔",
      align: "left"
    },
    {
      step: "04",
      title: "Gemini-Powered Insights",
      description: "The game changer. At the end of the month, our AI analyzes your spending patterns. Get personalized reports on where your money went and how to save.",
      route: "AI Analysis",
      color: "#e57398", // Pink (Special Feature)
      icon: "✨",
      align: "right"
    },
    {
      step: "05",
      title: "Settle Up & Relax",
      description: "The best part. Record a payment or settlement with a single click. Watch your balances turn to zero and your stress melt away.",
      route: "/settlements",
      color: "#1cc29f", // Teal (Success)
      icon: "🤝",
      align: "left"
    }
  ];

  return (
    <section className="py-24 bg-white font-sans relative overflow-hidden " id={id}>
      
      {/* Background decoration line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2 z-0" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-500 font-light">
            From the first bill to the final settlement.
          </p>
        </div>

        {/* Steps Flow */}
        <div className="flex flex-col gap-12 md:gap-0">
          {steps.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center w-full ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              
              {/* Text Side */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right pr-0 md:pr-12" : "md:text-left pl-0 md:pl-12"} text-center mb-8 md:mb-0`}>
                <div className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: item.color }}>
                  {item.route}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>

              {/* Center Icon/Marker */}
              <div className="w-full md:w-2/12 flex flex-col items-center justify-center relative">
                {/* Circle */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg z-10 border-4 border-white transition-transform hover:scale-110 duration-300"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                {/* Mobile connecting line (only visible on small screens) */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden absolute top-16 bottom-[-3rem] w-0.5 bg-gray-100 z-0">
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-300">
                        <ArrowDown size={16} />
                     </div>
                  </div>
                )}
              </div>

              {/* Empty Side (for balance) */}
              <div className="w-full md:w-5/12 hidden md:block"></div>
            
            </div>
          ))}
        </div>

        {/* Final Call to Action */}
        <div className="mt-24 text-center">
            <button className="bg-gray-800 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300">
                Start splitting now
            </button>
        </div>

      </div>
    </section>
  );
}