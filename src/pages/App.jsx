import Footer from "../components/Footer";
import Jumbotron from "../components/Modules/Jumbotron";
import SectionDownload from "../components/Modules/SectionDownload";
import SectionEnjoy from "../components/Modules/SectionEnjoy";
import SectionFAQ from "../components/Modules/SectionFAQ";
import SectionProfileKids from "../components/Modules/SectionProfileKids";
import SectionWatch from "../components/Modules/SectionWatch";
import Navbar from "../components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <SectionEnjoy />
      <SectionDownload />
      <SectionWatch />
      <SectionProfileKids />
      <SectionFAQ />
      <Footer />
    </>
  );
}
export default App;
