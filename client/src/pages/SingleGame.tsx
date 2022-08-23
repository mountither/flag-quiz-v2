import { useState } from "react";
import { toast } from "react-toastify";
import GameHeader from "../components/GameHeader";
import GameQuestions from "../components/GameQuestions";
import useProcessQuestions from "../hooks/useProcessQuestions";
import AnimatedPage from "../layouts/AnimatedPage";
import { defaultToastConfig } from "../utils/toastConfig";

const SingleGame = () => {
  const {
    processQuestions,
    score,
    setScore,
    countrySelections,
    loading,
    answerCountry,
  } = useProcessQuestions();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const flagClickHandler = (country: string) => {
    setSubmitting(true);
    toast.clearWaitingQueue();
    const answerState = country === answerCountry?.name;

    if (!answerState) {
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

  return (
    <AnimatedPage>
      <GameHeader
        answerCountryName={answerCountry?.name}
        isMultiPlayer={false}
        myScore={score}
      />

      <GameQuestions
        loading={loading}
        submitting={submitting}
        answerCountry={answerCountry}
        countrySelections={countrySelections}
        flagClickHandler={flagClickHandler}
      />
    </AnimatedPage>
  );
};

export default SingleGame;
