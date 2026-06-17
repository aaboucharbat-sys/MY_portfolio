import Navbar from "#components/Navbar";
import Welcome from "#components/Welcome";
import Dock from "#components/dock";
import Terminal from "#windows/Terminal";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <div>
      <div className="leaf leaf-left"></div>
      <div className="leaf leaf-right"></div>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
    </div>
  );
};

export default App;
