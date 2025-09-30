function calculer() {
  const logement = parseFloat(document.getElementById("logement").value) || 0;
  const tantiemeTotal = parseFloat(document.getElementById("tantiemeTotal").value) || 1;

  const coutTotal = parseFloat(document.getElementById("coutTotal").textContent) || 0;
  const coutTotal = parseFloat(document.getElementById("aidesTotal").textContent) || 0;
  const coutTotal = parseFloat(document.getElementById("resteTotal").textContent) || 0;

  const ratio = logement / tantiemeTotal;

  const cout = coutTotal * ratio;
  const aides = aidesTotal * ratio;
  const reste = resteTotal * ratio;

  document.getElementById("resultCout").textContent = cout.toFixed(2);
  document.getElementById("resultAides").textContent = aides.toFixed(2);
  document.getElementById("resultReste").textContent = reste.toFixed(2);
}

// ⚡ lancer une première fois au chargement
window.onload = calculer;

