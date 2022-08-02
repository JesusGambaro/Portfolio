import projects from "./data";
import {useSwipeable} from "react-swipeable";
const ProjectInfo = ({name, description, page, setPage}) => {
  const handlersBox = useSwipeable({
    onSwiped: ({dir, event}) => {
      event.stopPropagation();
      if (dir === "Left" && page < projects.length - 1) {
        setPage((p) => p + 1);
      } else if (dir === "Right" && page > 0) {
        setPage((p) => p - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
  });
  return (
    <div
      className="project-info"
      {...handlersBox}
      /*ref={(ref) => {
        refs.current[index] = ref;
        console.log(refs.current[index]);
        handlersBox.ref(refs.current[index]);
      }}*/
    >
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProjectInfo;
