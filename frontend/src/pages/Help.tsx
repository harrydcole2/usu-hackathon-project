import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css"; // TODO: Probably remove or rename

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handle_pantry = () => {
    console.log('button clicked');
    navigate("/pantry"); // Navigate to the provided path
  };


  return (
  <div className="flex flex-col min-h-screen justify-center items-center">
    <h1 className="text-5xl font-bold">Help</h1>
    <main className="justify-center items-center flex-grow">
      
      
    </main>
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