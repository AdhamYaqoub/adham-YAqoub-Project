export const handleSubmit = async (event) => {
  event.preventDefault();

  const inputText = document.getElementById("inputText").value;

  if (!checkUrl(inputText)) {
    alert("Invalid URL. Please enter a valid one.");
    return;
  }

  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: inputText }),
  });

  try {
    const data = await response.json();
    document.getElementById("results").innerHTML = `
            <p><strong>Polarity:</strong> ${data.polarity}</p>
            <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
            <p><strong>Text:</strong> ${data.text}</p>
        `;
  } catch (error) {
    console.error("Error:", error);
  }
};
