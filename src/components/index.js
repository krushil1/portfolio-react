import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import About from "./About/About";
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
