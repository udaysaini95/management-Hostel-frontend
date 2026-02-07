import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white rounded-2xl shadow-2xl p-10 text-center w-[350px]">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Tailwind CSS ✅
        </h1>

        <p className="text-gray-600 mb-6">
          Agar ye card center me hai, gradient background hai  
          aur styling aa rahi hai —  
          <span className="font-semibold text-green-600"> Tailwind working hai 🔥</span>
        </p>

        <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;
