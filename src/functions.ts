export const CapitalizeFirstLetter = (str) => {
  let text = str?.toLowerCase();
  return text?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};
