import { checkUrl } from "../src/client/js/urlChecker";

const handleSubmit = async (event) => {
  event.preventDefault();

  const url = document.getElementById("inputText").value;

  if (checkUrl(url)) {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: url }),
      });
      const data = await response.json();

      if (data.success) {
        console.log("Successful analysis:", data);
      } else {
        alert("Analysis failed, please try again later.");
      }
    } catch (error) {
      console.error("An error occurred while connecting to the server:", error);
    }
  } else {
    alert("Invalid URL. Please enter a valid URL.");
  }
};
