import { useEffect, useRef } from "react";
import "./skillsBar.css";

const skills = [
  "JavaScript",
  "React",
  "React Native",
  "Node.js",
  "TypeScript",
  "HTML",
  "CSS",
  "SQL",
];

const SkillsBar = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const speed = 0.5; 

    const list1 = marquee.children[0];
    const listWidth = list1.offsetWidth;

    let x = 0;
    const animate = () => {
      x -= speed;

      if (-x >= listWidth) {
        x += listWidth; 
      }

      marquee.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="skills_bar_wrapper">
      <div className="marquee" ref={marqueeRef}>
        <div className="skills_track">
          {skills.map((skill, i) => (
            <span key={`a-${i}`} className="skill_item">
              {skill}
            </span>
          ))}
        </div>
        <div className="skills_track">
          {skills.map((skill, i) => (
            <span key={`b-${i}`} className="skill_item">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsBar;
