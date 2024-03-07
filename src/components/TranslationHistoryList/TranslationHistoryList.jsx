import Input from "../Input/Input";
const TranslationHistoryList = ({ saved }) => {
  return (
    <div>
      {saved.map((m) => (
        <div>
          <Input disabled={true} value={m.eng}></Input>
          <Input disabled={true} value={m.tr}></Input>
        </div>
      ))}
    </div>
  );
};

export default TranslationHistoryList;
