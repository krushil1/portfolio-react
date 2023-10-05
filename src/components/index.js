import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Expertise from "./Expertise";
import MyProjects from "./MyProjects";
import Contact from "./Contact";

export default function Index() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Expertise />
      <MyProjects />
      <Contact />
    </>
  );
}
