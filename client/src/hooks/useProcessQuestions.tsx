import { useEffect, useState } from "react";
import { flagData, FlagData } from "../assets/data/flags";
import { shuffleArray } from "../utils/arrayFormatters";

const useProcessQuestions = () => {

    const [answerCountry, setAnswerCountry] = useState<FlagData | undefined>(
        undefined
      );
    
      const [score, setScore] = useState<number>(0);
    
      // const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(
      //   undefined
      // );
    
      const [countrySelections, setCountrySelections] = useState<
        Array<FlagData> | undefined
      >(undefined);
    
      const [loading, setLoading] = useState<boolean>(true);
    
      const processQuestions = () => {
        setLoading(true);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        })
        const _answerCountry =
          flagData[Math.floor(Math.random() * flagData.length)];
        setAnswerCountry(_answerCountry);
    
        // randomise flags
        const answerExcluded = flagData.filter(
          (country) => country.name !== _answerCountry?.name
        );
        const shuffled = shuffleArray(answerExcluded);
        const answerInserted =
          shuffled.splice(Math.random() * 4, 0, _answerCountry) && shuffled;
    
        setCountrySelections(answerInserted);
    
        setLoading(false);
      };
    
      useEffect(() => {
          processQuestions();
      }, []);
    
  return {processQuestions, score, setScore, countrySelections, loading, answerCountry}
}

export default useProcessQuestions