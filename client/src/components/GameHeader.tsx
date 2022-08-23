import { motion } from "framer-motion";
import MenuLink from "./MenuLink";

const headingAnim = {
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  exit: { scale: 0 },
};

type GameHeaderProps = {
  answerCountryName: string | undefined;
  isMultiPlayer: boolean;
  myScore: number;
  friendScore?: number;
};
const GameHeader = ({
  answerCountryName,
  isMultiPlayer,
  myScore,
  friendScore,
}: GameHeaderProps) => {
  return (
    <div className="fixed flex flex-row justify-between px-3 sm:px-10 items-center top-0 w-screen h-[100px] overflow-hidden py-5 z-50 bg-[#1c1c1c] border-b-2 border-gray-700">
      <MenuLink />
      <div className="">
        {answerCountryName ? (
          <motion.h1
            variants={headingAnim}
            transition={{ duration: 0.3 }}
            className="text-center font-extrabold text-transparent text-2xl sm:text-4xl bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-500 pb-10 mt-10"
          >
            {answerCountryName}?
          </motion.h1>
        ) : null}
      </div>
      <div className="flex flex-row items-center gap-5 sm:gap-10">
        <div className="flex flex-col items-center">
          <p className="text-base text-blue-200">My score:</p>
          <p className="text-lg sm:text-2xl font-extrabold text-blue-300">
            {myScore}
          </p>
        </div>
        {isMultiPlayer && friendScore !== undefined ? (
          <div className="flex flex-col items-center">
            <p className="text-base">Friend's score:</p>
            <p className="text-lg sm:text-2xl font-extrabold">{friendScore}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GameHeader;
