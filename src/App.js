import {BrowserRouter} from "react-router-dom";
import Header from "./Header/Header";
import AnimatedPaths from "./AnimatedPaths";
function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <main>
        <AnimatedPaths />
      </main>
    </BrowserRouter>
  );
}

export default App;
