import { EachUtils } from "../../utils/EachUtils";
import { useAtom } from "jotai";
import { languageAtom } from "../../jotai/atoms";
import { LIST_CTA_EN, LIST_CTA_ID } from "../../constants/listCTA";
import { DefaultButton } from "./DefaultButton";

const InputMembership = () => {
  const [language] = useAtom(languageAtom);
  return (
    <form>
      <EachUtils
        of={language == "en" ? LIST_CTA_EN : LIST_CTA_ID}
        render={(item, index) => (
          <div key={index} className="">
            <h3 className="text-white text-2xl">{item.title}</h3>
            <div className="relative flex justify-center gap-2 py-4 items-center">
              <input
                placeholder={item.labelInput}
                className=" w-full p-4 text-white bg-black/50 rounded-md border border-white/50 peer placeholder-transparent text-md"
              />
              <label className="text-white absolute bottom-0 top-5 left-0 pl-4 peer-placeholder-shown:top-8 peer-focus:top-[18px] peer-focus:text-sm transition-all ">
                {item.labelInput}
              </label>

              <DefaultButton
                text={item.buttonSubmit}
                isArrowIcon={true}
                styles={"flex py-4 flex items-center"}
              />
            </div>
          </div>
        )}
      />
    </form>
  );
};

export default InputMembership;
