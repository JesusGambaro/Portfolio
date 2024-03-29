import * as React from "react";
import "./loader.scss";
import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {wrap} from "popmotion";
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Loader = () => {
  return (
    <div className="loader">
      <div className="progress-load"></div>
    </div>
  );
};
export const Slider = ({images}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);
  const [load, setLoad] = useState(new Array(images.length).fill(false));
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        {!load[imageIndex] && <Loader />}
        <motion.img
          key={page}
          src={images[imageIndex]}
          onLoad={() =>
            setLoad(load.map((l, i) => (i === imageIndex ? true : l)))
          }
          className="slider-image"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: {type: "spring", stiffness: 300, damping: 30},
            opacity: {duration: 0.2},
          }}
          drag="x"
          dragConstraints={{left: 0, right: 0}}
          dragElastic={1}
          onDragEnd={(e, {offset, velocity}) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div className="slider-control">
        <div className="next" onClick={() => paginate(1)}>
          {"‣"}
        </div>
        <div className="prev" onClick={() => paginate(-1)}>
          {"‣"}
        </div>
      </div>
    </>
  );
};
