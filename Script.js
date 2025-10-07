
function calculer() {
  const formatFr = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const surfaceLogement = parseFloat(document.getElementById("logement").value) || 0;
  const surfaceTotale = parseFloat(document.getElementById("surfaceTotale").value) || 1;

  const coutTotal = parseFloat(document.getElementById("coutTotal").textContent) || 0;
  const aidesTotal = parseFloat(document.getElementById("aidesTotal").textContent) || 0;
  const resteTotal = parseFloat(document.getElementById("resteTotal").textContent) || 0;
  const economieEnergieTotal = parseFloat(document.getElementById("economieEnergieTotal").textContent) || 0;
  const ameliorationValeurVerteTotalEnPourcent = parseFloat(document.getElementById("ameliorationValeurVerteTotal").textContent) || 0;

  const prixAuM2 = 9600;
  
  console.log("ICI",coutTotal,aidesTotal,resteTotal);

  const ratio = surfaceLogement / surfaceTotale;
  console.log('ratio',ratio);
  console.log('economieEnergieTotal',economieEnergieTotal);


  const cout = coutTotal * ratio;
  const aides = aidesTotal * ratio;
  const reste = resteTotal * ratio;
  const Mensualite = (reste / 1000) * 4.3;
  const economieEnergie = (economieEnergieTotal * ratio) / 12;
  const effortMensuel = Mensualite - economieEnergie;
  const valeurVerte = (ameliorationValeurVerteTotalEnPourcent / 100) * prixAuM2 * surfaceLogement;


  // Résultats
  document.getElementById("resultCout").textContent = formatFr.format(cout);
  document.getElementById("resultAides").textContent = formatFr.format(aides);
  document.getElementById("resultReste").textContent = formatFr.format(reste);
  document.getElementById("resultMensualite").textContent = formatFr.format(Mensualite);
  document.getElementById("resultEconomieEnergie").textContent = formatFr.format(economieEnergie);
  document.getElementById("effortMensuel").textContent = formatFr.format(effortMensuel);
  document.getElementById("resultValeurVerte").textContent = formatFr.format(valeurVerte);
}

// ⚡ lancer une première fois au chargement
window.onload = calculer;





