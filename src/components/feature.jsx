"use client";

export default function Features({ id }) {
  const features = [
    {
      id: 0,
      title: "Flexible Splitting",
      description: "Split expenses exactly how you want. Divide equally, by percentages, by shares, or exact amounts. We handle the math.",
      color: "#1cc29f",
    },
    {
      id: 1,
      title: "Organized Groups",
      description: "Create groups for trips, housemates, or projects. Keep expenses separated by context so you never mix up the grocery bill with the vacation tab.",
      color: "#7c5cba",
    },
    {
      id: 2,
      title: "Debt Simplification",
      description: "The secret sauce. We automatically shuffle debts to minimize the number of transactions. Instead of 10 transfers, just make 1.",
      color: "#e57398",
    },
    {
      id: 3,
      title: "Expense History",
      description: "See a clear timeline of who paid for what and when. Add comments, attach receipts, and keep a permanent record.",
      color: "#5a6670",
    },
    {
      id: 4,
      title: "AI Monthly Reports",
      description: "Get intelligent insights about spending patterns. Understand where your money goes, identify trends, and get personalized recommendations.",
      color: "#f59e0b",
    },
    {
      id: 5,
      title: "Smart Notifications",
      description: "Stay in the loop with real-time alerts. Get notified about new expenses, pending payments, and when friends settle their debts.",
      color: "#06b6d4",
    },
    {
      id: 6,
      title: "Deadline Management",
      description: "Never miss a payment deadline again. Set reminders for who owes whom and track payment completion status effortlessly.",
      color: "#10b981",
    },
    {
      id: 7,
      title: "Analytics Dashboard",
      description: "Visualize your expenses with interactive charts and graphs. Track spending by category, person, or time period in real-time.",
      color: "#8b5cf6",
    }
  ];

  return (
    <section id={id} className="py-20 bg-white font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Powerful Features
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Everything you need to divide and conquer bills without the awkward conversations.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="group relative h-full"
            >
              <div 
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)` }}
              />
              <div className="relative bg-white rounded-2xl p-10 border border-gray-100 group-hover:border-gray-200 transition-all duration-300 h-full flex flex-col">
                
                {/* Color Accent */}
                <div 
                  className="absolute top-0 left-0 h-1.5 w-12 rounded-b-full transition-all duration-300 group-hover:w-32"
                  style={{ backgroundColor: feature.color }}
                />

                {/* Content */}
                <div className="mt-4">
                  <h3 
                    className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300"
                    style={{ color: feature.color }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}