import "./header.scss";
import {ReactComponent as Logo} from "../logoName.svg";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {NavLink, useNavigate} from "react-router-dom";
const Navbar = () => {
  const [hamburguer, setHamburguer] = useState(false);
  const style = {
    color: "white",
  };
  const location = useLocation();
  const bgColors = {
    "/": "#000000",
    "/Projects": "#4E9F3D",
    "/AboutMe": "#FF0063",
    "/Contact": "#47029c",
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      const logoIcon = document.querySelectorAll(".st0");
      logoIcon.forEach((e) => {
        e.style.stroke = "white";
      });
    }
    document.querySelector("main").style.backgroundColor =
      bgColors[location.pathname];
  }, [location]);

  return (
    <header style={{"--bg-color": bgColors[location.pathname]}}>
      <NavLink to="/">
        {location.pathname !== "/" && <Logo className="logo-icon" />}
      </NavLink>
      <div className="section-wrapper">
        <a
          href="https://github.com/JesusGambaro"
          target="_blank"
          style={style}
          rel="noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/pablo-jesus-gambaro/"
          target="_blank"
          style={style}
          rel="noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a
          href="https://wa.me/%2B542614726608?text=Pablo%20Jesus%20Gambaro%20-%20Front%20End%20Developer"
          target="_blank"
          style={style}
          rel="noreferrer"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </a>

        <div
          className={hamburguer ? "hamburguer cross" : "hamburguer"}
          onClick={() => setHamburguer(!hamburguer)}
        >
          <div className="line"></div>
        </div>
      </div>
      <nav className={hamburguer ? "active" : ""}>
        <div className="stars">
          {new Array(15).fill(0).map((_, i) => (
            <div className="star"></div>
          ))}
        </div>
        <div className="menu-container">
          <ul>
            <li style={{"--clr": "#EEEEEE"}}>
              <NavLink
                className={location.pathname === "/" ? "page-active" : ""}
                data-text="&nbsp;Home"
                to="/"
                onClick={() => setHamburguer(false)}
              >
                &nbsp;Home
              </NavLink>
            </li>

            <li style={{"--clr": "#91C483"}}>
              <NavLink
                className={
                  location.pathname === "/Projects" ? "page-active" : ""
                }
                data-text="&nbsp;Projects"
                to="/Projects"
                onClick={() => setHamburguer(false)}
              >
                &nbsp;Projects
              </NavLink>
            </li>
            <li style={{"--clr": "#FF6464"}}>
              <NavLink
                className={
                  location.pathname === "/AboutMe" ? "page-active" : ""
                }
                data-text="&nbsp;About&nbsp;Me"
                to="/AboutMe"
                onClick={() => setHamburguer(false)}
              >
                &nbsp;About Me
              </NavLink>
            </li>
            <li style={{"--clr": "#B2A4FF"}}>
              <NavLink
                className={
                  location.pathname === "/Contact" ? "page-active" : ""
                }
                data-text="&nbsp;Contact"
                to="/Contact"
                onClick={() => setHamburguer(false)}
              >
                &nbsp;Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
