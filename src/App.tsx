import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./app.css";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isValidIban, setIsValidIban] = useState<boolean>(false);
  const [showValidation, setShowValidation] = useState<boolean>(false);

  const ibanValidator = (value: string) => {
    const regexObj = /^LI\d{7}[A-Z0-9]{12}$/;
    const valueFormatted: string = value.toUpperCase().replace(/ /g, "");
    setIsValidIban(regexObj.test(valueFormatted));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowValidation(false);
    setInputValue(event.target.value);
  };

  const handleReset = (event: SyntheticEvent) => {
    event.preventDefault();
    setShowValidation(false);
    setInputValue("");
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    ibanValidator(inputValue);
    setShowValidation(true);
  };

  return (
    <div className="container">
      <h1>Liechtenstein IBAN validator</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="input-iban"
          value={inputValue}
          placeholder="e.g LI21 0351 0000 2162 011A A"
          onChange={handleChange}
        />
        <button className="button" type="submit">
          Validate
        </button>
        <button className="button button-reset" onClick={handleReset}>
          Reset
        </button>
      </form>

      {showValidation && (
        <div className="message-container">
          {isValidIban ? (
            <strong className="valid-message">
              This IBAN is valid for Liechtenstein
            </strong>
          ) : (
            <strong className="invalid-message">
              This IBAN is invalid for Liechtenstein
            </strong>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
