import "./input.sass";
const Input = ({ type, placeholder, value, setLang, disabled }) => {
  return (
    <textarea
      rows="6"
      cols="40"
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => setLang(e.target.value)}
    ></textarea>
  );
};

export default Input;
