import {useLocation, useNavigate} from "react-router-dom";
import "./scroller.scss";
const pagesUrl = ["/", "/Projects", "/AboutMe", "/Contact"];
const ScrollerBottom = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const downPage = () => {
    if (pathname !== "/Contact") {
      window.scrollTo({top: 0});

      navigate(pagesUrl[pagesUrl.indexOf(pathname) + 1]);
    }
  };
  return (
    <div className={"scroller-down" + (pathname !== "/" ? " no-home" : "")}>
      {pathname !== "/Contact" && (
        <i className="bi bi-arrow-down-circle-fill" onClick={downPage}></i>
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
        <i className="bi bi-arrow-up-circle-fill" onClick={upPage}></i>
      )}
    </div>
  );
};

export {ScrollerTop, ScrollerBottom};
