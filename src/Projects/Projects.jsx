import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import projects from "./data";
import {ScrollerTop, ScrollerBottom} from "../ScrollDown/Scroller";

import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import "./projects.scss";
import {Slider} from "../ImageSlider/Slider.tsx";
import ProjectInfo from "./ProjectInfo";
const boxVariant = {
  visible: {opacity: 1, y: "0"},
  hidden: {opacity: 1, y: "-100%"},
};
const Projects = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const elmt = document.getElementsByClassName("projects-container")[0];
    const listener = (e) => {
      if (e.deltaY > 0) navigate("/AboutMe");
      else if (e.deltaY < 0) navigate("/");
      elmt.removeEventListener("wheel", listener);
    };
    elmt.addEventListener("wheel", listener);
  }, [navigate]);
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <motion.section
      className="projects-container"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      transition={{
        x: {type: "spring", stiffness: 50},
        y: {type: "spring", stiffness: 50},
        default: {duration: ".75"},
      }}
    >
      {isMobile && <ScrollerTop />}
      {projects.map((project, index) => {
        return (
          <motion.div
            className="project-box"
            key={index}
            initial={{scale: 0, rotation: -180}}
            animate={{
              left: `${(index + 1 - page) * 100 - 100}vw`,
              scale: 1,
              rotation: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
            }}
          >
            <div className="project-description-container">
              <h1>Projects</h1>
              <ProjectInfo
                name={project.name}
                description={project.description}
                page={page}
                setPage={setPage}
              />
              {isMobile && (
                <div className="project-container">
                  <div className="slider">
                    <Slider images={project.images} />
                  </div>
                </div>
              )}
              <div className="info-wrapper">
                <div className="tools">
                  <h3>Tools</h3>
                  <span className="tools-wrapper">
                    {project.tools.map((tool) => (
                      <img
                        src={`./Images/${tool.toLowerCase()}.png`}
                        alt={tool}
                        title={tool}
                        key={tool}
                      />
                    ))}
                  </span>
                </div>
                <div className="links">
                  <h3>Links</h3>
                  <span className="links-wrapper">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <img
                        src="./Images/github.png"
                        alt="github"
                        title="Github"
                      />
                    </a>
                    <a href={project.link} target="_blank" rel="noreferrer">
                      <img
                        src="./Images/globe.png"
                        alt="globe"
                        tittle="Web Site"
                      />
                    </a>
                  </span>
                </div>
              </div>
            </div>
            {!isMobile && (
              <div className="project-container">
                <div className="slider">
                  <Slider images={project.images} />
                </div>
              </div>
            )}
            {page !== 0 && (
              <i
                className="fa-solid fa-chevron-left arrow-left"
                onClick={() => {
                  setPage((p) => p - 1);
                }}
              ></i>
            )}
            {page !== projects.length - 1 && (
              <i
                className="fa-solid fa-chevron-right arrow-right"
                onClick={() => {
                  setPage((p) => p + 1);
                }}
              ></i>
            )}
            {isMobile && <ScrollerBottom />}
          </motion.div>
        );
      })}
    </motion.section>
  );
};

export default Projects;
