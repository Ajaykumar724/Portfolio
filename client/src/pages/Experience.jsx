const experiences = [
  {
    company: "Pragati Prakashan",
    role: "Software Developer",
    duration: "Jan 2026 - Present",
  },
  {
    company: "Jarnox Technologies",
    role: "Software Engineer Intern",
    duration: "Aug 2025 - Jan 2026",
  },
  {
    company: "ONDC Seller Platform",
    role: "Backend Developer",
    duration: "Pre-Production Project",
  },
];

function Experience() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-8">
        Experience.tsx
      </h1>

      {experiences.map((exp, index) => (
        <div
          key={index}
          className="border-l-2 border-blue-500 pl-6 mb-8"
        >
          <h2 className="text-xl font-semibold">
            {exp.role}
          </h2>

          <div className="text-green-400">
            {exp.company}
          </div>

          <div className="text-gray-400">
            {exp.duration}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Experience;