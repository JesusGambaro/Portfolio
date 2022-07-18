import React from "react";
import Home from "./Home/Home";
import AboutMe from "./AboutMe/AboutMe";
import Contact from "./Contact/Contact";
import Projects from "./Projects/Projects";
import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
const AnimatedPaths = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AboutMe" element={<AboutMe />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedPaths;
