import { DefaulLayout } from "../components/DefaultLayout";
import Footer from "../components/Footer";
import Jumbotron from "../components/Modules/Jumbotron";
import SectionDownload from "../components/Modules/SectionDownload";
import SectionEnjoy from "../components/Modules/SectionEnjoy";
import SectionFAQ from "../components/Modules/SectionFAQ";
import SectionProfileKids from "../components/Modules/SectionProfileKids";
import SectionWatch from "../components/Modules/SectionWatch";

function App() {
  return (
    <DefaulLayout>
      <Jumbotron />
      <SectionEnjoy />
      <SectionDownload />
      <SectionWatch />
      <SectionProfileKids />
      <SectionFAQ />
      <Footer />
    </DefaulLayout>
  );
}
export default App;
