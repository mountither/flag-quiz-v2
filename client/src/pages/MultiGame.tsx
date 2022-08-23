import copy from "copy-to-clipboard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { SiFigshare } from "react-icons/si";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import GameHeader from "../components/GameHeader";
import GameQuestions from "../components/GameQuestions";
import useProcessQuestions from "../hooks/useProcessQuestions";
import AnimatedPage from "../layouts/AnimatedPage";
import { defaultToastConfig } from "../utils/toastConfig";

const socket = io("http://localhost:3001");

const ROOM_ID = "dsknjgfaeroga";

const MultiGame = () => {
  const [shareLink, setShareLink] = useState<string | undefined>(undefined);

  const [gameFinish, setGameFinish] = useState<{
    isFinished: boolean;
    winner: "self" | "friend" | undefined;
  }>({ isFinished: false, winner: undefined });

  const {
    processQuestions,
    score,
    setScore,
    countrySelections,
    loading,
    answerCountry,
  } = useProcessQuestions();

  const { id } = useParams();

  const [awaitingFriend, setAwaitingFriend] = useState<boolean>(true);

  const [friendScore, setFriendScore] = useState<number>(0);

  const handleGameStart = () => {
    socket.on("start_game", (data) => {
      setAwaitingFriend(false);
    });
  };

  const handleFriendScore = () => {
    socket.on("get_friend_score", (data) => {
      setFriendScore(data.score);
    });
  };

  const handleGameEnd = () => {
    socket.on("friend_won", () => {
      setGameFinish({
        isFinished: true,
        winner: "friend",
      });
    });
  };

  const processSocketConnection = async () => {
    socket.emit("join_session", { roomId: ROOM_ID });

    socket.on("session_join_error", () => {
      console.log("error");
    });

    socket.on("session_joined", () => {
      console.log("joined!");
    });
  };

  useEffect(() => {
    processSocketConnection();
    handleGameStart();
    handleFriendScore();
    handleGameEnd();
  }, []);

  useEffect(() => {
    if (id) {
      //* friend has navigated to shared link. w/room_session.
      socket.emit("join_session", { roomId: id });
    }
  }, [id]);

  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (score === 10) {
      socket.emit("set_winner");

      setGameFinish({
        isFinished: true,
        winner: "self",
      });
    }
  }, [score]);
  const flagClickHandler = (country: string) => {
    console.log("clicked");
    setSubmitting(true);

    toast.clearWaitingQueue();

    const answerState = country === answerCountry?.name;

    if (!answerState) {
      socket.emit("friend_score", { score: score - 1 });

      setScore((prev) => prev - 1);

      toast.error(
        <p>
          That's <span className="font-bold">{country}</span>. Try again!
        </p>,
        {
          ...defaultToastConfig,
        }
      );
      setSubmitting(false);
    } else {
      socket.emit("friend_score", { score: score + 1 });

      setScore((prev) => prev + 1);

      toast.success("Correct Answer", {
        ...defaultToastConfig,
      });

      setTimeout(() => {
        processQuestions();
        setSubmitting(false);
      }, 500);
    }
  };

  const onShareLinkClick = (link: string) => {
    copy(link);

    toast.success("Link Copied!", {
      ...defaultToastConfig,
      position: "bottom-center",
      autoClose: 900,
    });
  };

  return (
    <AnimatedPage>
      {awaitingFriend ? (
        <motion.div className="flex flex-col h-screen item-center">
          <div className="m-auto px-10 bg-gray-800 rounded-lg py-3 text-center">
            <SiFigshare
              className="self-center mx-auto mt-5 mb-10 animate-spin-slow"
              size={150}
              color="gray"
            />
            <h1 className="text-xl font-bold">Share Link with a friend</h1>
            <p className="mt-3 text-gray-300 ">
              When your friend opens the link, the game will commence!
            </p>

            <div
              onClick={() =>
                onShareLinkClick(`http://localhost:5173/multi/${ROOM_ID}`)
              }
              className="mt-10 border-[1px] border-gray-600 rounded-lg p-5"
            >
              <p>{`http://localhost:5173/multi/${ROOM_ID}`}</p>
            </div>

            <a
              href="/"
              type="button"
              className="bg-white px-5 rounded-2xl py-3 hover:opacity-70 duration-300 ease-in-out mt-10 mb-5"
            >
              <p className="text-black font-medium p-0">Cancel</p>
            </a>
          </div>
        </motion.div>
      ) : gameFinish.isFinished ? (
        <>
          {gameFinish.winner === "self" ? <ReactConfetti /> : null}
          <motion.div className="flex flex-col h-screen item-center">
            <div className="m-auto px-10 bg-gray-800 rounded-lg py-3 text-center">
              <h1 className="text-3xl font-bold">
                {gameFinish.winner === "self" ? "You Win!" : "Your Friend Wins"}
              </h1>

              <a
                href="/"
                type="button"
                className="bg-white px-5 rounded-2xl py-3 hover:opacity-70 duration-300 ease-in-out mt-10 mb-5"
              >
                <p className="text-black font-medium p-0">Back to menu</p>
              </a>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <GameHeader
            answerCountryName={answerCountry?.name}
            isMultiPlayer={true}
            myScore={score}
            friendScore={friendScore}
          />
          <GameQuestions
            loading={loading}
            submitting={submitting}
            answerCountry={answerCountry}
            countrySelections={countrySelections}
            flagClickHandler={flagClickHandler}
          />
        </>
      )}
    </AnimatedPage>
  );
};

export default MultiGame;
