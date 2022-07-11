import abecedaryValues from "./abecedaryValues";

export const ibanStructureValidator = (value: string): boolean => {
  const regexObj = /^LI\d{7}[A-Z0-9]{12}$/;
  const valueFormatted: string = value.toUpperCase().replace(/ /g, "");
  return regexObj.test(valueFormatted);
};

export const ibanMod97Validator = (iban: string): boolean => {
  const firstFourthCharacters = iban.slice(0, 4);
  const restOfIban = iban.slice(4);
  const reorderedIban = restOfIban + firstFourthCharacters;
  const ibanFormattedToNumbers = reorderedIban
    .split("")
    .map((character: string) => {
      if (Object.keys(abecedaryValues).includes(character)) {
        return abecedaryValues[character];
      }
      return character;
    });

  const ibanFormatted = BigInt(ibanFormattedToNumbers.join(""));
  const mod97 = BigInt(97);
  const moduleResult = ibanFormatted % mod97;
  const moduleToNumber = Number(moduleResult);

  return moduleToNumber === 1;
};
