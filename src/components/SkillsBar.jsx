import React from "react";
import "./skillsBar.css";

const SkillsBar = ({ items }) => {
  return (
    <div className="skills_bar_wrapper">
      <div className="marquee">
        <div className="marquee__inner">

          {items.map((item, i) => (
            <span key={i} className="skill_item">
              {item}
            </span>
          ))}

        </div>
      </div>
    </div>
  );
};

export default SkillsBar;
