// Données de l'application
const appData = {
  inputs: {
    surfaceLogementDefaut: 75,
    surfaceTotaleDefaut: 19100,
  },
  totaux: {
    coutTotal: 15867200,
    aidesTotal: 2851000,
    resteTotal: 13016200,
    economieEnergieTotal: 200000,
    ameliorationValeurVerteTotal: 2,
  },
  parametres: {
    prixAuM2: 9600,
    tauxMensualiteParMillier: 4.3,
  },
};

// Fonction pour parser les nombres formatés avec séparateurs de milliers
function parseFormattedNumber(text) {
  if (!text) return 0;
  // Enlever les espaces (séparateur de milliers) et remplacer la virgule par un point
  const cleaned = text.toString().replace(/\s/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

// Fonction pour formater un nombre avec séparateurs de milliers
function formatNumber(number) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

// Initialiser l'interface avec les données
function initialiserInterface() {
  // Initialiser les inputs
  document.getElementById("logement").value =
    appData.inputs.surfaceLogementDefaut;
  document.getElementById("surfaceTotale").value =
    appData.inputs.surfaceTotaleDefaut;

  // Initialiser les totaux avec formatage
  document.getElementById("coutTotal").textContent = formatNumber(
    appData.totaux.coutTotal
  );
  document.getElementById("aidesTotal").textContent = formatNumber(
    appData.totaux.aidesTotal
  );
  document.getElementById("resteTotal").textContent = formatNumber(
    appData.totaux.resteTotal
  );
  document.getElementById("economieEnergieTotal").textContent = formatNumber(
    appData.totaux.economieEnergieTotal
  );
  document.getElementById("ameliorationValeurVerteTotal").textContent =
    appData.totaux.ameliorationValeurVerteTotal;

  // Lancer le premier calcul
  calculer();
}

function calculer() {
  const formatFr = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const surfaceLogement =
    parseFloat(document.getElementById("logement").value) || 0;
  const surfaceTotale =
    parseFloat(document.getElementById("surfaceTotale").value) || 1;

  const coutTotal = parseFormattedNumber(
    document.getElementById("coutTotal").textContent
  );
  const aidesTotal = parseFormattedNumber(
    document.getElementById("aidesTotal").textContent
  );
  const resteTotal = parseFormattedNumber(
    document.getElementById("resteTotal").textContent
  );
  const economieEnergieTotal = parseFormattedNumber(
    document.getElementById("economieEnergieTotal").textContent
  );
  const ameliorationValeurVerteTotalEnPourcent = parseFormattedNumber(
    document.getElementById("ameliorationValeurVerteTotal").textContent
  );

  const prixAuM2 = appData.parametres.prixAuM2;
  const tauxMensualite = appData.parametres.tauxMensualiteParMillier;

  const ratio = surfaceLogement / surfaceTotale;

  const cout = coutTotal * ratio;
  const aides = aidesTotal * ratio;
  const reste = resteTotal * ratio;
  const Mensualite = (reste / 1000) * tauxMensualite;
  const economieEnergie = (economieEnergieTotal * ratio) / 12;
  const effortMensuel = Mensualite - economieEnergie;
  const valeurVerte =
    (ameliorationValeurVerteTotalEnPourcent / 100) * prixAuM2 * surfaceLogement;

  // Résultats
  document.getElementById("resultCout").textContent = formatFr.format(cout);
  document.getElementById("resultAides").textContent = formatFr.format(aides);
  document.getElementById("resultReste").textContent = formatFr.format(reste);
  document.getElementById("resultMensualite").textContent =
    formatFr.format(Mensualite);
  document.getElementById("resultEconomieEnergie").textContent =
    formatFr.format(economieEnergie);
  document.getElementById("effortMensuel").textContent =
    formatFr.format(effortMensuel);
  document.getElementById("resultValeurVerte").textContent =
    formatFr.format(valeurVerte);
}

// ⚡ lancer une première fois au chargement
window.onload = initialiserInterface;
