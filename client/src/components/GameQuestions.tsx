import { motion } from "framer-motion";
import { useState } from "react";
import { FlagData } from "../assets/data/flags";
import Spinner from "../components/Spinner";

type GameQuestionsProps = {
  loading: boolean;
  submitting: boolean;
  answerCountry: FlagData | undefined;
  countrySelections: Array<FlagData> | undefined;
  flagClickHandler: (countryName: string) => void;
};

const GameQuestions = ({
  loading,
  submitting,
  answerCountry,
  countrySelections,
  flagClickHandler,
}: GameQuestionsProps) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <div className="mt-[150px] pb-20">
      {submitting ? <Spinner styles="absolute top-[155px] right-10" /> : null}

      {loading ? (
        <Spinner styles="mt-[200px]" />
      ) : (
        <motion.div
          key={answerCountry?.alpha3}
          variants={{
            initial: { opacity: 0.8 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-10 mt-20">
            {countrySelections?.map((country) => (
              <div
                onClick={() =>
                  !submitting ? flagClickHandler(country.name) : null
                }
                key={country.alpha3}
              >
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoading ? 0 : 1 }}
                  src={country.file_url}
                  onLoad={() => setTimeout(() => setImageLoading(false), 200)}
                  className="w-30 h-20 rounded-md object-cover hover:shadow-xl hover:shadow-gray-700 duration-500 ease-in-out cursor-pointer"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GameQuestions;
