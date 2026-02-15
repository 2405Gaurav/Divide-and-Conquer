"use client";
import React from "react";
import { 
  Users, 
  Receipt, 
  Sparkles, 
  CheckCircle2, 
  Wallet,
  Check,
  Zap,
  MessageCircle,
  BarChart3
} from "lucide-react";

// --- sub-components for reusability ---

const FeaturedIcon = ({ icon: Icon, color }) => (
  <div className="mb-6 flex">
    <div className={`relative flex h-12 w-12 items-center justify-center rounded-full border-[8px] bg-opacity-10`}
         style={{ borderColor: `${color}15`, backgroundColor: `${color}30` }}>
       <Icon className="h-5 w-5" style={{ color: color }} />
    </div>
  </div>
);

const CheckListItem = ({ text, color }) => (
  <li className="flex gap-3">
    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-opacity-10"
         style={{ backgroundColor: `${color}20` }}>
      <Check className="h-3.5 w-3.5" style={{ color: color }} />
    </div>
    <span className="text-gray-600 text-base">{text}</span>
  </li>
);

const MockupWindow = ({ src, alt, align = "left" }) => (
  <div className={`relative w-full rounded-2xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-3xl lg:p-3 shadow-2xl ${align === 'right' ? 'lg:-mr-16' : 'lg:-ml-16'}`}>
    <div className="rounded-xl bg-white ring-1 ring-gray-900/5 overflow-hidden">
        {/* Fake Browser Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
            </div>
        </div>
        {/* Image */}
        <img 
            src={src} 
            alt={alt} 
            className="w-full h-auto object-cover"
        />
    </div>
  </div>
);

// --- Main Component ---

export default function HowItWorks({ id }) {
  const steps = [
    {
      label: "Groups & Circles",
      title: "Create your shared circles",
      description: "Start by adding contacts or creating a group. Whether it's a trip to Bali, housemates, or a couple, set up the context in seconds.",
      color: "#7c5cba", // Purple
      icon: Users,
      checks: [
        "Create unlimited groups for any occasion",
        "Add friends instantly via link or contacts",
        "Support for 50+ currencies worldwide"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2669"
    },
    {
      label: "Quick Expenses",
      title: "Add expenses on the fly",
      description: "Paid for dinner? Just enter the amount, select who was involved, and hit save. We handle the split math instantly.",
      color: "#1cc29f", // Teal
      icon: Zap,
      checks: [
        "Split equally, by percentage, or by shares",
        "Works offline when you have no signal",
        "Attach receipts and notes to every bill"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
    },
    {
      label: "Smart Analysis",
      title: "Gemini-Powered Insights",
      description: "The game changer. At the end of the month, our AI analyzes your spending patterns and gives personalized reports.",
      color: "#e57398", // Pink
      icon: Sparkles,
      checks: [
        "Visualize spending trends over time",
        "Identify where you can save money",
        "Natural language queries for your data"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2669"
    },
    {
      label: "Easy Settlements",
      title: "Settle up and relax",
      description: "The best part. Record a payment or settlement with a single click. Watch your balances turn to zero and your stress melt away.",
      color: "#10b981", // Emerald
      icon: Wallet,
      checks: [
        "Integrated with major payment apps",
        "Smart debt shuffling to minimize transfers",
        "Friendly automatic reminders for debts"
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2670"
    }
  ];

  return (
    <section id={id} className="py-24 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-24">
          <span className="text-sm font-semibold text-[#7c5cba] mb-3 block uppercase tracking-wide">
            How it works
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Less stress, more sharing.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto font-light">
             From the first bill to the final settlement, we make sharing money simple, transparent, and fair for everyone involved.
          </p>
        </div>

        {/* Alternating Steps */}
        <div className="flex flex-col gap-24 lg:gap-32">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                
                {/* Text Side */}
                <div className={`flex flex-col ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <FeaturedIcon icon={step.icon} color={step.color} />
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <ul className="flex flex-col gap-4">
                    {step.checks.map((check, i) => (
                      <CheckListItem key={i} text={check} color={step.color} />
                    ))}
                  </ul>
                </div>

                {/* Image Side */}
                <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Background decoration blob */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full opacity-20 blur-3xl -z-10"
                    style={{ backgroundColor: step.color }}
                  />
                  
                  <MockupWindow 
                    src={step.image} 
                    alt={step.title} 
                    align={isEven ? 'left' : 'right'} 
                  />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}