import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {ScrollerTop, ScrollerBottom} from "../ScrollDown/Scroller";
import {useSelector, useDispatch} from "react-redux/es/exports";
import {scrollUp, scrollDown} from "../Redux/stateChanger";
import "./about-me.scss";
const AboutMe = () => {
  const navigate = useNavigate();
  const variant = useSelector((state) => state.stateChanger.animation);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("AboutMe=> ", variant);
    const elmt = document.getElementsByClassName("about-me-container")[0];
    const listener = (e) => {
      if (e.deltaY < 0) {
        navigate("/Projects");
        dispatch(scrollUp());
        elmt.removeEventListener("wheel", listener);
      } else if (e.deltaY > 0) {
        navigate("/Contact");
        dispatch(scrollDown());
        elmt.removeEventListener("wheel", listener);
      }
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
  const [load, setLoad] = useState(false);
  const isMobile = width <= 768;
  return (
    <motion.section
      className="about-me-container"
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={control}
      exit="exit"
      transition={{
        x: {type: "spring", stiffness: 50},
        y: {type: "spring", stiffness: 50},
        default: {duration: ".75"},
      }}
    >
      {isMobile && <ScrollerTop />}
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
        <img src="./Images/profile-me.png" alt="me" />
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
              <div key={img.src}>
                <img
                  key={"thumbnail " + i}
                  src={img.src}
                  alt="henry"
                  className="thumbnail"
                  title={img.title}
                  style={load ? {} : {visibility: "hidden"}}
                  onLoad={() => setLoad(true)}
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
                  <img src={img.src} alt="henry" />
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
                      <i className="bi bi-x-square"></i>
                    </button>
                  )}
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isMobile && <ScrollerBottom />}
    </motion.section>
  );
};

export default AboutMe;
