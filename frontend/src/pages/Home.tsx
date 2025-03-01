import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Refrigerator, ChefHat, ArrowRight, Search } from "lucide-react"

function Home() {
  const produceList = [
    "Apple", "Banana", "Carrot", "Tomato", "Lettuce",
    "Onion", "Grapes", "Strawberry", "Mango", "Potato"
  ];
  const navigate = useNavigate();

  const randomPosition = () => ({
    x: Math.random() * window.innerWidth - 100,
    y: Math.random() * window.innerHeight - 100
  });

  const handle_login = () => {
    console.log("button clicked");
    navigate("/login"); // Navigate to the provided path
  };

  return (
  <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-[#C9D6EA] to-[#E8F7EE] relative">
    <nav className="relative z-10 flex justify-between items-center p-6 bg-[#3F6566] backdrop-blur-sm shadow-lg mb-12">
      <div className="flex items-center space-x-3">
        <Refrigerator className="h-8 w-8 text-[#3F6566]" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#C9D6EA] to-[#E8F7EE] bg-clip-text text-transparent p-1.75">
          The Pantry AI
        </h1>
      </div>
      <div className="flex space-x-4 text-lg">
        {/* <a href="/pantry" className=" text-[#C9D6EA] hover:text-[#E8F7EE] transition-colors p-3 flex items-center gap-2">
          <Search className="h-4 w-4" />
          Pantry
        </a>
        <a href="#" className="text-[#C9D6EA] hover:text-[#E8F7EE] transition-colors p-3 flex items-center gap-2">
          <ChefHat className="h-4 w-4" />
          Recipes
        </a> */}
        <a href="/help" className="text-[#C9D6EA] hover:text-[#E8F7EE] transition-colors p-3">
          Help
        </a>
        <a
          href="/login"
          className="bg-gradient-to-r from-[#448C8E] to-[#15AEB4] rounded-xl p-3 text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          Login
        </a>
      </div>
    </nav>
    <main className="relative z-10 flex flex-col items-center flex-grow px-4 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800 text-center">
            Never Waste Food <span className="text-emerald-600">Again</span>
          </h2>

          <p className=" p-6 mb-8 text-xl md:text-2xl text-gray-700 leading-relaxed bg-white/80 backdrop-blur-sm rounded-2xl shadow-md ">
            Welcome to the Pantry! We help you track your food, alert you before things expire, and generate
            meal plans to use everything efficiently. Smart food management for a sustainable kitchen.
          </p>
        <div className="flex justify-center mb-16">
          <motion.button
            className="group flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-full text-xl md:text-2xl px-8 py-4 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handle_login}
          >
            Get Started
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            {
              title: "Track Inventory",
              description: "Keep tabs on everything in your fridge and pantry with ease.",
              icon: "🧊",
              color: "from-blue-500 to-blue-400",
            },
            {
              title: "Prevent Waste",
              description: "Get timely notifications before your food expires.",
              icon: "🍎",
              color: "from-emerald-500 to-emerald-400",
            },
            {
              title: "Smart Recipes",
              description: "Generate meal plans based on what you already have.",
              icon: "👨‍🍳",
              color: "from-amber-500 to-amber-400",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${feature.color} p-4 text-center`}>
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    
      {produceList.map((produce, index) => (
        <motion.div
          key={index}
          className="absolute text-xl font-bold text-emerald-600 bg-white/80 px-3 py-1 rounded-full shadow-sm z-0"
          initial={randomPosition()}
          animate={{
            x: [randomPosition().x, randomPosition().x + 100, randomPosition().x - 100],
            y: [randomPosition().y, randomPosition().y + 100, randomPosition().y - 100],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: Math.random() * 5 + 10,
            ease: "easeInOut",
          }}
        >
          {produce}
        </motion.div>
      ))}



    <footer className="relative z-10 bg-gray-800 text-white py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Refrigerator className="mr-2 h-5 w-5" /> The Fridge AI
              </h3>
              <p className="text-gray-300">Making food management smarter and more sustainable.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/pantry" className="text-gray-300 hover:text-white">
                    Pantry
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Recipes
                  </a>
                </li>
                <li>
                  <a href="/help" className="text-gray-300 hover:text-white">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-700 text-center">
            <p>© 2025 The Fridge AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
  </div>

  );
}

export default Home;
