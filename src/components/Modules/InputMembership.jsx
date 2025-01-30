import { EachUtils } from "../../utils/EachUtils";
import { useAtom } from "jotai";
import { languageAtom, emailAtom } from "../../jotai/atoms";
import { LIST_CTA_EN, LIST_CTA_ID } from "../../constants/listCTA";
import { DefaultButton } from "./DefaultButton";
import { useNavigate } from "react-router-dom";

const InputMembership = () => {
  const [language] = useAtom(languageAtom);
  const navigate = useNavigate();
  const [, setEmail] = useAtom(emailAtom);

  const handleEmail = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  return (
    <form>
      <EachUtils
        of={language == "en" ? LIST_CTA_EN : LIST_CTA_ID}
        render={(item, index) => (
          <div key={index} className="">
            <h3 className="text-white text-2xl">{item.title}</h3>
            <div className="relative flex justify-center gap-2 py-4 items-center">
              <input
                type="email"
                placeholder={item.labelInput}
                onChange={(e) => setEmail(e.target.value)}
                className=" w-full p-4 text-white z-10 bg-black/20 rounded-md border border-white/50 peer placeholder-transparent text-md"
              />
              <label className="text-white absolute bottom-0 top-5 left-0 pl-4 peer-placeholder-shown:top-8 peer-focus:top-[18px] peer-focus:text-sm transition-all ">
                {item.labelInput}
              </label>

              <DefaultButton
                onClick={handleEmail}
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
