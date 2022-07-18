import {useEffect, useState} from "react";
import anime from "animejs/lib/anime.es.js";
import {ReactComponent as Name} from "../logoName.svg";
import {ReactComponent as Tree} from "../tree.svg";
import "./home.scss";
import {useNavigate} from "react-router-dom";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";

const boxVariant = {
  visible: {opacity: 1, y: "0"},
  hidden: {opacity: 0, y: "-100%"},
};

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    anime({
      targets: "#Layer_1 path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1500,
      delay: (_, i) => i * 10,
      direction: "alternate",
      loop: false,
    });
    const elmt = document.getElementsByClassName("home-container")[0];
    const listener = (e) => {
      if (e.deltaY > 0) {
        navigate("/Projects");
        elmt.removeEventListener("wheel", listener);
      }
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

  return (
    <motion.section
      className="home-container"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      exit="exit"
      transition={{
        x: {type: "spring", stiffness: 50},
        y: {type: "spring", stiffness: 50},  
        default: {duration: ".75"},
      }}
    >
      <div className="hire-name">
        <div className="hire">
          <Name />
        </div>
        <h2 className="profession">Front End Developer</h2>
        <button className="contact-btn" onClick={() => navigate("/Contact")}>
          Contact Me
        </button>
      </div>
      <div className="scrolldown" onClick={() => navigate("/Projects")}>
        <div className="chevrons">
          <div className="chevrondown"></div>
          <div className="chevrondown"></div>
        </div>
      </div>
      <div className="tree-background">
        <Tree />
      </div>
    </motion.section>
  );
};

export default Home;
