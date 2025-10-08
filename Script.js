// Données de l'application
const appData = {
  inputs: {
    surfaceLogementDefaut: 75,
    surfaceTotaleDefaut: 19100,
  },
  scenarios: {
    "bouygues +": {
      nom: "Bouygues Premium",
      coutTotal: 15867200,
      aidesTotal: 2851000,
      economieEnergieTotal: 244000*0.6,
      ameliorationValeurVerteTotal: 4,
    },
    "bouygues-standard": {
      nom: "Bouygues Base",
      coutTotal: 15561200,
      aidesTotal: 1590000,
      economieEnergieTotal: 244000*0;5,
      ameliorationValeurVerteTotal: 3,
    },
    autre: {
      nom: "Autre",
      editable: true,
      coutTotal: 1000,
      aidesTotal: 1590000,
      economieEnergieTotal: 150000,
      ameliorationValeurVerteTotal: 1.5,
    },
  },
  parametres: {
    prixAuM2: 9600,
    tauxMensualiteParMillier: 4.3,
  },
};

// Scénario actif
let scenarioActif = "bouygues-plus";

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

// Changer de scénario
function changerScenario(scenario) {
  scenarioActif = scenario;

  // Mettre à jour l'état des onglets
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  const activeTab = document.querySelector(`[data-scenario="${scenario}"]`);
  activeTab.classList.add("active");

  // Centrer le tab actif
  centrerTab(activeTab);

  // Afficher ou cacher les inputs éditables selon le scénario
  const inputsEditables = document.getElementById("inputsEditables");
  const scenarioData = appData.scenarios[scenario];

  if (scenarioData.editable) {
    inputsEditables.style.display = "block";
    // Initialiser les valeurs des inputs avec les valeurs du scénario
    document.getElementById("inputCoutTotal").value = scenarioData.coutTotal;
    document.getElementById("inputAidesTotal").value = scenarioData.aidesTotal;
    document.getElementById("inputEconomieEnergieTotal").value =
      scenarioData.economieEnergieTotal;
  } else {
    inputsEditables.style.display = "none";
  }

  // Mettre à jour les valeurs et recalculer
  mettreAJourScenario();
}

// Centrer le tab actif dans la zone scrollable
function centrerTab(tab) {
  const scrollContainer = tab.closest(".tabs > div > div");
  if (!scrollContainer) return;

  const tabLeft = tab.offsetLeft;
  const tabWidth = tab.offsetWidth;
  const containerWidth = scrollContainer.offsetWidth;

  // Calculer la position pour centrer le tab
  const scrollPosition = tabLeft - containerWidth / 2 + tabWidth / 2;

  // Scroll avec animation fluide
  scrollContainer.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
}

// Mettre à jour depuis les inputs éditables
function mettreAJourDepuisInputs() {
  const scenario = appData.scenarios[scenarioActif];

  // Si le scénario n'est pas éditable, ne rien faire
  if (!scenario.editable) return;

  // Récupérer les valeurs des inputs
  const coutTotal =
    parseFloat(document.getElementById("inputCoutTotal").value) || 0;
  const aidesTotal =
    parseFloat(document.getElementById("inputAidesTotal").value) || 0;
  const economieEnergieTotal =
    parseFloat(document.getElementById("inputEconomieEnergieTotal").value) || 0;

  // Mettre à jour l'objet scénario
  scenario.coutTotal = coutTotal;
  scenario.aidesTotal = aidesTotal;
  scenario.economieEnergieTotal = economieEnergieTotal;

  // Mettre à jour l'affichage
  mettreAJourScenario();
}

// Mettre à jour les valeurs du scénario actif
function mettreAJourScenario() {
  const scenario = appData.scenarios[scenarioActif];
  const resteTotal = scenario.coutTotal - scenario.aidesTotal;

  // Mettre à jour les totaux avec formatage
  document.getElementById("coutTotal").textContent = formatNumber(
    scenario.coutTotal
  );
  document.getElementById("aidesTotal").textContent = formatNumber(
    scenario.aidesTotal
  );
  document.getElementById("resteTotal").textContent = formatNumber(resteTotal);
  document.getElementById("economieEnergieTotal").textContent = formatNumber(
    scenario.economieEnergieTotal
  );
  document.getElementById("ameliorationValeurVerteTotal").textContent =
    scenario.ameliorationValeurVerteTotal;

  // Recalculer les résultats
  calculer();
}

// Initialiser l'interface avec les données
function initialiserInterface() {
  // Initialiser les inputs
  document.getElementById("logement").value =
    appData.inputs.surfaceLogementDefaut;
  document.getElementById("surfaceTotale").value =
    appData.inputs.surfaceTotaleDefaut;

  // Charger le scénario par défaut
  mettreAJourScenario();

  // Centrer le tab actif au chargement
  const activeTab = document.querySelector(".tab.active");
  if (activeTab) {
    setTimeout(() => centrerTab(activeTab), 100);
  }
}

function calculer() {
  const formatFr = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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


