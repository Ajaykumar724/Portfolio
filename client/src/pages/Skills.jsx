const skills = {
  Languages: [
    "Python",
    "Java",
    "JavaScript",
  ],

  Backend: [
    "FastAPI",
    "Node.js",
    "Express.js",
    "Django",
  ],

  Frontend: [
    "React",
    "Tailwind",
    "Bootstrap",
  ],

  Databases: [
    "PostgreSQL",
    "MongoDB",
    "MySQL",
  ],

  Security: [
    "OAuth2",
    "JWT",
  ],

  AI: [
    "LLM Integration",
    "Prompt Engineering",
  ],
};

function Skills() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-6">Skills</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} className="border border-gray-700 rounded p-4">
            <h2 className="text-lg font-semibold text-blue-400 mb-3">{cat}</h2>

            <ul className="list-disc list-inside text-gray-300">
              {items.map((s) => (
                <li key={s} className="py-1">{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;