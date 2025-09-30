function calculer() {
  const logement = parseFloat(document.getElementById("logement").value) || 0;
  const tantiemeTotal = parseFloat(document.getElementById("tantiemeTotal").value) || 1;

  const coutTotal = parseFloat(document.getElementById("coutTotal").value) || 0;
  const aidesTotal = parseFloat(document.getElementById("aidesTotal").value) || 0;
  const resteTotal = parseFloat(document.getElementById("resteTotal").value) || 0;

  const ratio = logement / tantiemeTotal;

  const cout = coutTotal * ratio;
  const aides = aidesTotal * ratio;
  const reste = resteTotal * ratio;

  document.getElementById("resultCout").textContent = cout.toFixed(2);
  document.getElementById("resultAides").textContent = aides.toFixed(2);
  document.getElementById("resultReste").textContent = reste.toFixed(2);
}
