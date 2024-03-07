import Input from "../Input/Input";
const TranslationHistoryList = ({
  setTranslationHistory,
  translationHistory,
}) => {
  const handleClick = () => {
    localStorage.removeItem("saved");
    setTranslationHistory([]);
  };

  return (
    <div>
      <h3>Translation History</h3>
      {translationHistory.map((t, index) => (
        <div
          style={{
            borderBottom: "2px solid",
            borderBottomColor: "#fabd2f",
          }}
          key={index}
        >
          <br />
          <Input disabled={true} value={t.eng}></Input>
          <br />
          <Input disabled={true} value={t.tr}></Input>
        </div>
      ))}
      <br />
      <button onClick={() => handleClick()}>Clear History</button>
    </div>
  );
};

export default TranslationHistoryList;
