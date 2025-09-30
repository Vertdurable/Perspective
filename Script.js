function calculer() {
  const logement = parseFloat(document.getElementById("logement").value) || 0;
  const tantiemeTotal = parseFloat(document.getElementById("tantiemeTotal").value) || 1;

  const coutTotal = 1373872;
  const aidesTotal = 891146.86;
  const resteTotal = 482725.14;

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
