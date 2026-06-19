import Navbar from "#components/Navbar";
import Welcome from "#components/Welcome";
import Dock from "#components/dock";
import Resume from "#windows/Resume";
import Terminal from "#windows/Terminal";
import Finder from "#windows/finder";
import Safari from "#windows/safari";

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
      <Safari />
      <Resume />
      <Finder />
    </div>
  );
};

export default App;
