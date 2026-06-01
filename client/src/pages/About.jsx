function About() {
  return (
    <div className="p-8">
      <div className="text-xl text-blue-400 mb-6">
        About.tsx
      </div>

      <pre className="text-sm text-gray-300">
{`const developer = {
  name: "Ajay Kumar",
  role: "Backend Engineer",

  education: {
    degree: "B.Tech Computer Science",
    college: "FIT Engineering College",
    sgpa: "8.41"
  },

  specialization: [
    "Backend Development",
    "FastAPI",
    "Node.js",
    "AI Integration",
    "REST APIs"
  ],

  currentFocus: [
    "System Design",
    "Microservices",
    "AI Applications"
  ]
}`}
      </pre>

      <div className="mt-8 text-gray-400 leading-8">
        Backend-focused Software Engineer with
        experience building scalable APIs,
        authentication systems, AI-powered
        applications, and production-ready
        backend solutions using FastAPI,
        Node.js, PostgreSQL, MongoDB, and
        modern backend technologies.
      </div>
    </div>
  );
}

export default About;