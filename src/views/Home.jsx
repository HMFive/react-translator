import { useState, useEffect } from "react";
import translationService from "../service/translationService";
import MicrophoneButton from "../components/MicrophoneButton/MicrophoneButton";
import Input from "../components/Input/Input";
import TranslationHistoryList from "../components/TranslationHistoryList/TranslationHistoryList";
const Home = () => {
  const [translatedText, setTranslatedText] = useState("");

  const [inputText, setInputText] = useState("");

  const [translationHistory, setTranslationHistory] = useState([]);

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const storedTranslationHistory =
      JSON.parse(localStorage.getItem("translationHistory")) || [];
    setTranslationHistory(storedTranslationHistory);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputText !== "") {
        translationService.translate(inputText).then((fact) => {
          setTranslatedText(fact.translatedText);
          const translationHistoryText = {
            eng: inputText,
            tr: fact.translatedText,
          };

          setTranslationHistory((prevTranslationHistory) => [
            ...prevTranslationHistory,
            translationHistoryText,
          ]);
          localStorage.setItem(
            "translationHistory",
            JSON.stringify([...translationHistory, translationHistoryText])
          );
        });
      }
      localStorage.setItem(
        "translationHistory",
        JSON.stringify(translationHistory)
      );
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [inputText]);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";

  const handleMicrophoneClick = () => {
    setIsListening(true);
    recognition.start();
  };

  recognition.onresult = (event) => {
    const voiceInput = event.results[0][0].transcript;
    setInputText(voiceInput);
  };

  recognition.onspeechend = () => {
    setIsListening(false);
    recognition.stop();
  };

  recognition.onerror = (event) => {
    setIsListening(false);
    console.log(`Error occurred in recognition: ${event.error}`);
  };

  return (
    <>
      <p>English</p>
      <Input
        type="text"
        placeholder="Please speak or write in English"
        value={inputText}
        setLang={setInputText}
      ></Input>
      <p>Turkish</p>
      <Input
        type="text"
        placeholder="Translation..."
        value={translatedText}
        disabled={true}
      ></Input>
      <br />
      <br />
      <MicrophoneButton
        isListening={isListening}
        handleClick={handleMicrophoneClick}
      ></MicrophoneButton>
      {translationHistory.length > 0 ? (
        <TranslationHistoryList
          setTranslationHistory={setTranslationHistory}
          translationHistory={translationHistory}
        ></TranslationHistoryList>
      ) : null}
    </>
  );
};

export default Home;
