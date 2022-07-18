import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import "./projects.scss";
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
  const projects = [
    {
      name: "Portfolio",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius commodi dolore quae reprehenderit dolores a aperiam est nesciunt, magnam illum harum ducimus aspernatur modi, eum asperiores fugiat, distinctio ut atque!",
      images: [
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658077811/Portfolio/Portfolio_1.png",
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658077829/Portfolio/Portfolio_3.png",
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658077860/Portfolio/Portfolio_4.png",
      ],
      link: "http://localhost:3000/",
      tools: ["React", "Sass", "HTML", "CSS"],
    },
    {
      name: "Pokedex",
      description:
        "HENRY: Pokemon App / Mar 2022 – Apr 2022 Individual web development of a SPA (Single Page Application), with the possibility to visualize all the pokemon brought from the Back End, see their details, add, edit and delete pokemon, as well as the implementation of filters according to pre-defined parameters and search by name.",
      images: [
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658074880/Portfolio/pokedex_1_ypld5w.png",
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658074880/Portfolio/pokedex_2_guxznv.png",
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658074882/Portfolio/pokedex_3_h1ivvv.png",
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658074885/Portfolio/pokedex_4_phk6ip.png",
      ],
      link: "https://pokedex-client-deployed.vercel.app",
      github: "https://github.com/JesusGambaro/PI-Pokemon-main",
      tools: ["React", "PostgreSQL", "Sass", "HTML", "CSS"],
    },
    {
      name: "Henry Shoes",
      description:
        "HENRY: Henry Shoes / Apr 2022 – May 2022 Web development of footwear e-commerce in a team of 8 people via Trello and Github applying agile methodologies (SCRUM). Developed with: PostgreSQL/ Sequelize and Express for the Back End and React/ Redux, SASS, and Bootstrap for the Front End, with a user system, panel for users and administrators, and payment gateway. ",
      images: [
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658074994/Portfolio/HenryShoes_1.png",
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658075022/Portfolio/HenryShoes_2.png",
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658077533/Portfolio/HenryShoes_3.png",
        "https://res.cloudinary.com/dsqpyqpnq/image/upload/v1658077573/Portfolio/HenryShoes_4.png",
      ],
      link: "https://henry-shoes.vercel.app",
      github: "https://github.com/JesusGambaro/PF-Grupo-9",
      tools: ["React", "PostgreSQL", "Sass", "HTML", "CSS"],
    },
  ];
  const [slider, setSlider] = useState(0);
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
      <div className="project-description-container">
        <h1>Projects</h1>
        <div className="project-info">
          <h2>{projects[page].name}</h2>
          <p>{projects[page].description}</p>
        </div>
        <div className="info-wrapper">
          <div className="tools">
            <h3>Tools</h3>
            <span className="tools-wrapper">
              {projects[page].tools.map((tool) => (
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
              <a href={projects[page].github} target="_blank" rel="noreferrer">
                <img src="./Images/github.png" alt="github" title="Github" />
              </a>
              <a href={projects[page].link} target="_blank" rel="noreferrer">
                <img src="./Images/globe.png" alt="globe" tittle="Web Site" />
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="project-container">
        <div className="slider">
          {projects[page].images?.map((img, i) =>
            img ? (
              <img
                src={img}
                alt={img}
                className={i === slider ? "active" : ""}
                key={i}
              />
            ) : (
              <span className="loader" key={i}></span>
            )
          )}
        </div>
        <div className="slider-control">
          {/*     <i
            className="bi bi-caret-left-fill slider-left"
            onClick={() => {
              if (slider !== 0) setSlider((p) => p - 1);
            }}
          ></i> */}
          {projects[page].images?.map((_, i) => (
            <div
              className={i === slider ? "active" : ""}
              onClick={() => setSlider(i)}
              key={"dot" + i}
            ></div>
          ))}
          {/*        <i
            className="bi bi-caret-right-fill slider-right"
            onClick={() => {
              if (slider < projects[page].images.length - 1)
                setSlider((p) => p + 1);
            }}
          ></i> */}
        </div>
      </div>
      {page !== 0 && (
        <i
          className="bi bi-caret-left-fill arrow-left"
          onClick={() => {
            setSlider(0);
            setPage((p) => p - 1);
          }}
        ></i>
      )}
      {page !== projects.length - 1 && (
        <i
          className="bi bi-caret-right-fill arrow-right"
          onClick={() => {
            setSlider(0);
            setPage((p) => p + 1);
          }}
        ></i>
      )}
    </motion.section>
  );
};

export default Projects;
