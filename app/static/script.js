const input = document.getElementById("text-input");
const button = document.getElementById("embed-button");
const textOut = document.getElementById("text-out");
const lengthOut = document.getElementById("length-out");
const vectorOut = document.getElementById("vector-out");

button.addEventListener("click", async () => {
  const text = input.value;
  const response = await fetch("/embed?text=" + encodeURIComponent(text));
  const data = await response.json();

  textOut.textContent = data.text;
  lengthOut.textContent = data.vector.length;
  vectorOut.textContent = "[" + data.vector.join(", ") + "]";
});

const text1Input = document.getElementById("text1-input");
const text2Input = document.getElementById("text2-input");
const compareButton = document.getElementById("compare-button");
const vector1Out = document.getElementById("vector1-out");
const vector2Out = document.getElementById("vector2-out");
const similarityOut = document.getElementById("similarity-out");

compareButton.addEventListener("click", async () => {
  const text1 = text1Input.value;
  const text2 = text2Input.value;

  const response1 = await fetch("/embed?text=" + encodeURIComponent(text1));
  const data1 = await response1.json();
  vector1Out.textContent = "[" + data1.vector.join(", ") + "]";

  const response2 = await fetch("/embed?text=" + encodeURIComponent(text2));
  const data2 = await response2.json();
  vector2Out.textContent = "[" + data2.vector.join(", ") + "]";

  const response3 = await fetch("/similarity?text1=" + encodeURIComponent(text1) + "&text2=" + encodeURIComponent(text2));
  const data3 = await response3.json();
  similarityOut.textContent = data3.similarity.toFixed(4);
});
