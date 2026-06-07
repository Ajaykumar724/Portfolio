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
				<pre>{`\nconst developer = {\n  name: "Ajay Kumar",\n  role: "Backend Engineer",\n  experience: "Software Developer",\n  focus: [\n    "FastAPI",\n    "Node.js",\n    "AI Systems",\n    "ONDC"\n  ]\n}\n        `}</pre>
			</div>
		</div>
	);
}

export default Home;
