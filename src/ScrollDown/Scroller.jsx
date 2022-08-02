import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./scroller.scss";
const pagesUrl = ["/", "/Projects", "/AboutMe", "/Contact"];
const ScrollerBottom = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  var body = document.body,
    html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const downPage = () => {
    if (pathname !== "/Contact") {
      window.scrollTo({top: 0});
      navigate(pagesUrl[pagesUrl.indexOf(pathname) + 1]);
    }
  };
  return (
    <div
      className={"scroller-down" + (pathname !== "/" ? " no-home" : "")}
      style={
        pathname === "/Projects" ? {bottom: `${- height * 0.54}px`} : {}
      }
    >
      {pathname !== "/Contact" && (
        <i className="fa-solid fa-angles-down" onClick={downPage}></i>
      )}
    </div>
  );
};
const ScrollerTop = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const upPage = () => {
    if (pathname !== "/") {
      navigate(pagesUrl[pagesUrl.indexOf(pathname) - 1]);
    }
  };
  return (
    <div className={"scroller-up"}>
      {pathname !== "/" && (
        <i className="fa-solid fa-angles-up" onClick={upPage}></i>
      )}
    </div>
  );
};

export {ScrollerTop, ScrollerBottom};
