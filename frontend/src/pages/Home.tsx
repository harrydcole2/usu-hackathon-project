import { useState } from "react";
import "../App.css"; // TODO: Probably remove or rename

function Home() {
  const [count, setCount] = useState(0);

  return (
  <div className="flex flex-col min-h-screen">
    <nav className="flex justify-between items-center p-6 bg-gray-100 shadow-md">
      <h1 className="text-5xl font-bold">The Fridge AI</h1>
      <div className="flex space-x-8 text-lg">
        <a href="#" className="hover:underline">Pantry</a>
        <a href="#" className="hover:underline">Recipes</a>
        <a href="#" className="hover:underline">Help</a>
      </div>
    </nav>
    <main className="justify-center items-center flex-grow">
      <p className="p-10 mt-10 w-[60%] mx-auto text-center">Welcome to the Fridge! This is a app that helps you keep track of the food  that you have in the fridge and let you know when somethings expired. It can also generate a meal plan for you and help you use everything you have in the fridge. So that food won’t ever expire. </p>
      <button className="absolute right-[45%] mx-auto border-4 rounded-2xl text-3xl p-3 mt-10"> Start</button>
    </main>
    <footer className=" bg-gray-800 text-white py-6">
      <div className="flex justify-center space-x-8">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Contact</a>
      </div>
    <p className="text-center mt-4">© 2025 The Fridge AI. All rights reserved.</p>
    </footer>
  </div>

  );
}

export default Home;




// <div>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs text-9xl">
//         Click on the Vite and React logos to learn more
//       </p>