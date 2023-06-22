document.getElementById("temperature-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const temperatureInput = document.getElementById("temperature");
  const scaleSelect = document.getElementById("scale");
  const resultSection = document.getElementById("result");
  const convertedValue = document.getElementById("converted-value");
  const explanation = document.getElementById("explanation");

  const temperature = parseFloat(temperatureInput.value);
  const scale = scaleSelect.value;

  if (isNaN(temperature)) {
    convertedValue.textContent = "";
    explanation.textContent = "Please enter a valid temperature.";
    resultSection.style.display = "block";
    return;
  }

  let convertedTemperature;
  let resultText;

  if (scale === "celsius") {
    convertedTemperature = (temperature * 9/5) + 32;
    resultText = `${temperature} Celsius = ${convertedTemperature.toFixed(2)} Fahrenheit`;
    explanation.textContent = "To convert Celsius to Fahrenheit, multiply by 9/5 and add 32.";
  } else if (scale === "fahrenheit") {
    convertedTemperature = (temperature - 32) * 5/9;
    resultText = `${temperature} Fahrenheit = ${convertedTemperature.toFixed(2)} Celsius`;
    explanation.textContent = "To convert Fahrenheit to Celsius, subtract 32 and multiply by 5/9.";
  }

  convertedValue.textContent = resultText;
  resultSection.style.display = "block";

  // Store the conversion result and scale as data attributes for the reserve button
  temperatureInput.setAttribute("data-converted-value", convertedTemperature.toFixed(2));
  temperatureInput.setAttribute("data-converted-scale", scale);
});

document.getElementById("reset-btn").addEventListener("click", function() {
  document.getElementById("temperature-form").reset();
  document.getElementById("result").style.display = "none";
});

document.getElementById("reserve-btn").addEventListener("click", function() {
  const temperatureInput = document.getElementById("temperature");
  const resultSection = document.getElementById("result");
  const convertedValue = document.getElementById("converted-value");
  const explanation = document.getElementById("explanation");

  const convertedTemperature = temperatureInput.getAttribute("data-converted-value");
  const convertedScale = temperatureInput.getAttribute("data-converted-scale");

  if (convertedTemperature && convertedScale) {
    temperatureInput.value = convertedTemperature;
    document.getElementById("scale").value = convertedScale;
    convertedValue.textContent = "";
    explanation.textContent = "";
    resultSection.style.display = "none";
  }
});
