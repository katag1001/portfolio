import React from "react";
import "./skillsBar.css";

const skills = [
  "JavaScript",
  "MongoDB",
  "React",
  "React Native",
  "Node.js",
  "TypeScript",
  "HTML",
  "CSS",
  "SQL",
];

const SkillsBar = () => {
  return (
    <div className="skills_bar_wrapper">
      <div className="marquee">
        <div className="marquee__inner">
          {/* Original list */}
          {skills.map((skill, i) => (
            <span key={i} className="skill_item">
              {skill}
            </span>
          ))}
          {/* Duplicate list for seamless scrolling */}
          {skills.map((skill, i) => (
            <span key={`dup-${i}`} className="skill_item">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsBar;
