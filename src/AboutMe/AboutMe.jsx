import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import "./about-me.scss";
const boxVariant = {
  visible: {opacity: 1, y: "0"},
  hidden: {opacity: 1, y: "-100%"},
};
const AboutMe = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const elmt = document.getElementsByClassName("about-me-container")[0];
    const listener = (e) => {
      if (e.deltaY < 0) {
        navigate("/Projects");
        elmt.removeEventListener("wheel", listener);
      } else if (e.deltaY > 0) navigate("/Contact");
    };
    elmt.addEventListener("wheel", listener);
  });
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  const [popImg, setPopImg] = useState([
    {
      show: false,
      src: "./Images/henry-certification.jpg",
      btnColor: "white",
      title: "Soy Henry's Certification",
    },
    {
      show: false,
      src: "./Images/english.jpg",
      btnColor: "black",
      title: "EFSET's English Certificate",
    },
  ]);
  const technologies = [
    {name: "HTML", url: "https://developer.mozilla.org/en/docs/Web/HTML"},
    {name: "CSS", url: "https://developer.mozilla.org/en/docs/Web/CSS"},
    {name: "SASS", url: "https://sass-lang.com/"},
    {name: "JavaScript", url: "https://www.javascript.com/"},
    {name: "TypeScript", url: "https://www.typescriptlang.org"},
    {name: "NodeJS", url: "https://nodejs.org/en/"},
    {name: "React", url: "https://reactjs.org/"},
    {name: "Redux", url: "https://redux.js.org/"},
    {name: "PostgreSQL", url: "https://www.postgresql.org/"},
    {name: "MongoDB", url: "https://www.mongodb.com/"},
    {name: "Heroku", url: "https://www.heroku.com/"},
    {name: "Git", url: "https://git-scm.com/"},
  ];
  return (
    <motion.section
      className="about-me-container"
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
      <div className="description-container">
        <h1>Skills & Experecience</h1>
        <p>
          I am currently a graduate of Full Stack web development at boot camp
          &nbsp;
          <a href="https://www.soyhenry.com" rel="noreferrer" target="_blank">
            Soy HENRY
          </a>
          &nbsp; and a student of programming at &nbsp;{" "}
          <a
            href="http://www.frm.utn.edu.ar/index.php"
            rel="noreferrer"
            target="_blank"
          >
            UTN - Facultad Regional Mendoza
          </a>
          &nbsp; , who is constantly looking to learn and improve in what he
          does. Normally, I am a curious and meticulous person who always seeks
          to improve day by day and learn or incorporate new things, such as
          technologies, ideas or designs to integrate in all my personal and
          group projects.
        </p>
        <img src="./Images/profile-me.jpg" alt="me" />
      </div>

      <div className="skills-container">
        <h2>Technologies</h2>
        <ul>
          {technologies.map((tech) => (
            <li key={tech.name} title={tech.name}>
              <a href={tech.url} rel="noreferrer" target="_blank">
                <img
                  src={`./Images/${tech.name.toLowerCase()}.png`}
                  alt={tech.name}
                />
              </a>
            </li>
          ))}
        </ul>
        <div className="certification">
          <h2>Certifications</h2>
          <div className="slides">
            {popImg.map((img, i) => (
              <>
                <img
                  key={"thumbnail " + i}
                  src={img.src}
                  alt="henry"
                  className="thumbnail"
                  title={img.title}
                  onClick={() => {
                    if (!popImg.find((el) => el.show)) {
                      setPopImg(
                        popImg.map((e, ix) =>
                          ix === i ? {...e, show: true} : e
                        )
                      );
                    }
                  }}
                />
                <figure
                  key={"figure " + i}
                  className={img.show ? "big-img" : ""}
                >
                  <img
                    src={img.src}
                    alt="henry"
                    /* onClick={() =>
                      setPopImg(
                        popImg.map((e, ix) =>
                          ix === i ? {...e, show: false} : e
                        )
                      )
                    } */
                  />
                  {img.show && (
                    <button
                      className="close-c-btn"
                      style={{"--closeBtn": img.btnColor}}
                      onClick={() =>
                        setPopImg(
                          popImg.map((e, ix) =>
                            ix === i ? {...e, show: false} : e
                          )
                        )
                      }
                    >
                      <i class="bi bi-x-square"></i>
                    </button>
                  )}
                </figure>
              </>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;
