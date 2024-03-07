import { useState, useEffect } from "react";
import translationService from "../service/translationService";
import MicrophoneButton from "../components/MicrophoneButton/MicrophoneButton";
import MicrophoneIcon from "../assets/microphone.svg";
import Input from "../components/Input/Input";
import TranslationHistoryList from "../components/TranslationHistoryList/TranslationHistoryList";
const Home = () => {
  const [trans, setTrans] = useState("");

  const [srcLang, setSrcLang] = useState("");

  const [saved, setSaved] = useState([]);

  const [isListening, setIsListening] = useState(false);
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
    setSrcLang(voiceInput);
  };

  recognition.onspeechend = () => {
    setIsListening(false);
    recognition.stop();
  };

  recognition.onerror = (event) => {
    setIsListening(false);
    console.log(`Error occurred in recognition: ${event.error}`);
  };
  useEffect(() => {
    console.log(srcLang);
    const delayDebounceFn = setTimeout(() => {
      if (srcLang !== "") {
        translationService.translate(srcLang).then((fact) => {
          console.log(fact);
          setTrans(fact.translatedText);
          const savedText = {
            eng: srcLang,
            tr: fact.translatedText,
          };
          setSaved([...saved, savedText]);
        });
      } else {
        setTrans("");
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [srcLang]);

  console.log(saved);

  return (
    <>
      <Input
        type="text"
        placeholder="Please speak or write in English"
        value={srcLang}
        setLang={setSrcLang}
      ></Input>
      <Input
        type="text"
        placeholder="Translation..."
        value={trans}
        disabled={true}
      ></Input>
      <MicrophoneButton
        isListening={isListening}
        handleClick={handleMicrophoneClick}
      ></MicrophoneButton>
      <TranslationHistoryList saved={saved}></TranslationHistoryList>
    </>
  );
};

export default Home;
