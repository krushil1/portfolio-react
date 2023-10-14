import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import About from "./About/About";
import Expertise from "./Expertise/Expertise";
import MyProjects from "./MyProjects/MyProjects";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";

export default function Index() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Expertise />
      <MyProjects />
      <Contact />
      <Footer />
    </>
  );
}
