import squareIcon from "../../assets/square.svg";
import microphoneIcon from "../../assets/microphone.svg";

const MicrophoneButton = ({ handleClick, isListening }) => {
  return (
    <button onClick={handleClick}>
      {isListening ? (
        <img src={squareIcon}></img>
      ) : (
        <img src={microphoneIcon}></img>
      )}
    </button>
  );
};

export default MicrophoneButton;
