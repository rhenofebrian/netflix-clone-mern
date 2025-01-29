import { useAtom } from "jotai";
import { JUMBOTRON_IMAGE } from "../../constants/listAsset";
import { EachUtils } from "../../utils/EachUtils";
import { languageAtom } from "../../jotai/atoms";
import {
  LIST_JUMBOTRON_EN,
  LIST_JUMBOTRON_ID,
} from "../../constants/listJumbotron";
import InputMembership from "./InputMembership";

const Jumbotron = () => {
  const [language] = useAtom(languageAtom);

  return (
    <div className="mb-24 px-8">
      <img
        src={JUMBOTRON_IMAGE}
        alt="netflix-jumbotron"
        className="absolute top-0 left-0 object-cover h-[700px] w-full brightness-75"
      />
      <EachUtils
        of={language == "en" ? LIST_JUMBOTRON_EN : LIST_JUMBOTRON_ID}
        render={(item, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-center items-center mt-44 gap-4 text-center"
          >
            <h1 className="font-extrabold text-white text-5xl">{item.title}</h1>
            <p className="text-white text-2xl">{item.desc}</p>
            <InputMembership />
          </div>
        )}
      />
    </div>
  );
};

export default Jumbotron;
