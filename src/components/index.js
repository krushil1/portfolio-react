import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import About from "./About/About";
import Expertise from "./Expertise/Expertise";
import MyProjects from "./MyProjects/MyProjects";
import Contact from "./Contact/Contact";

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
