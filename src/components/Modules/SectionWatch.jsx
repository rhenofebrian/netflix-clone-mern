import { useAtom } from "jotai";
import {
  WATCH_DEVICE_IMAGE,
  WATCH_DEVICE_VIDEO,
} from "../../constants/listAsset";
import {
  LIST_CONTENT_3_EN,
  LIST_CONTENT_3_ID,
} from "../../constants/listContent";
import { EachUtils } from "../../utils/EachUtils";
import SectionLayout from "../SectionLayout";
import { languageAtom } from "../../jotai/atoms";

const SectionWatch = () => {
  const [language] = useAtom(languageAtom);
  return (
    <SectionLayout>
      <EachUtils
        of={language == "en" ? LIST_CONTENT_3_EN : LIST_CONTENT_3_ID}
        render={(item, render) => (
          <div key={render} className="px-8 flex flex-col gap-4">
            <h2 className="text-5xl font-bold">{item.title}</h2>
            <p className="text-2xl">{item.desc}</p>
          </div>
        )}
      />
      <div className="relative max-w-xl mx-auto">
        <img src={WATCH_DEVICE_IMAGE} alt="" className="relative z-20" />
        <div className="absolute w-[60%] top-10 left-1/2 -translate-x-1/2">
          <video autoPlay loop>
            <source src={WATCH_DEVICE_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
    </SectionLayout>
  );
};

export default SectionWatch;
