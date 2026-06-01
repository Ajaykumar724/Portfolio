function Home() {
  return (
    <div className="p-10">
      <div className="text-6xl font-bold">
        Ajay Kumar
      </div>

      <div className="text-green-400 mt-4 text-2xl">
        Backend Engineer
      </div>

      <div className="mt-6 text-gray-400">
        FastAPI • Node.js • AI/LLM
      </div>

      <div className="mt-10 border border-gray-700 rounded-lg p-6">
        <pre>{`
const developer = {
  name: "Ajay Kumar",
  role: "Backend Engineer",
  experience: "Software Developer",
  focus: [
    "FastAPI",
    "Node.js",
    "AI Systems",
    "ONDC"
  ]
}
        `}</pre>
      </div>
    </div>
  );
}

export default Home;