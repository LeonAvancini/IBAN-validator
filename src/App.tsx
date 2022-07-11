import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./app.css";
import {
  ibanMod97Validator,
  ibanStructureValidator,
} from "./utils/ibanValidators";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isValidIban, setIsValidIban] = useState<boolean>(false);
  const [showValidation, setShowValidation] = useState<boolean>(false);

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

  const ibanValidator = (value: string) => {
    if (ibanStructureValidator(value) && ibanMod97Validator(value)) {
      setIsValidIban(true);
    } else setIsValidIban(false);
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
