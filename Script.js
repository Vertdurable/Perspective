// Formatage français des nombres
const formatFr = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function calculer() {
  const logement = parseFloat(document.getElementById("logement").value) || 0;
  const tantiemeTotal = parseFloat(document.getElementById("tantiemeTotal").value) || 1;

  const coutTotal = parseFloat(document.getElementById("coutTotal").textContent) || 0;
  const aidesTotal = parseFloat(document.getElementById("aidesTotal").textContent) || 0;
  const resteTotal = parseFloat(document.getElementById("resteTotal").textContent) || 0;

  console.log("ICI",coutTotal,aidesTotal,resteTotal);

  const ratio = logement / tantiemeTotal;

  const cout = coutTotal * ratio;
  const aides = aidesTotal * ratio;
  const reste = resteTotal * ratio;

  // Résultats
  document.getElementById("resultCout").textContent = formatFr.format(cout);
  document.getElementById("resultAides").textContent = formatFr.format(aides);
  document.getElementById("resultReste").textContent = formatFr.format(reste);
}

// ⚡ lancer une première fois au chargement
window.onload = calculer;



