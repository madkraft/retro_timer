export const speak = (text) => {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.text = text;
  synth.speak(utterThis);
};
