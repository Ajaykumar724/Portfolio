const projects = [
  {
    name: "HR Module",
    tech: "FastAPI, OAuth2, PostgreSQL, AI",
    description:
      "AI powered HR automation and interview generation platform",
  },

  {
    name: "StayEase",
    tech: "Node.js, MongoDB, React",
    description:
      "Property booking and listing platform",
  },

  {
    name: "AKGPT",
    tech: "LLM, FastAPI, REST APIs",
    description:
      "AI conversational assistant",
  },

  {
    name: "ONDC Seller Backend",
    tech: "FastAPI, PostgreSQL",
    description:
      "Pre-production ONDC seller backend for business operations",
  },
];

function Projects() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-6">
        Projects.tsx
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="border border-gray-700 p-5 rounded-lg"
          >
            <h2 className="text-xl text-blue-400">
              {project.name}
            </h2>

            <p className="text-gray-300 mt-3">
              {project.description}
            </p>

            <div className="text-green-400 mt-4">
              {project.tech}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;