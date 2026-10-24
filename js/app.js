// Chef d'orchestre : initialisation + evenements
import { state } from "./state.js";
import { loadAllData } from "./dataservices.js";
import { render, fillCategories, showError, showOrderDetail } from "./view.js";
 
// Initialisation : charger -> remplir le state -> premier rendu
async function init() {
  try {
   const data = await loadAllData();
 
    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;
 
    fillCategories(state);
    render(state);
  } 
  catch (error) {
    console.error("Erreur de chargement :", error);
    showError("Impossible de charger les donnees. Verifiez les fichiers JSON et lancez le projet avec Live Server.");
}
}
 
// Recherche 
document.querySelector("#searchInput").addEventListener("input", event => {
  state.search = event.target.value;
  render(state);
});
 
// Filtre statut
document.querySelector("#statusFilter").addEventListener("change", event => {
  state.status = event.target.value;
  render(state);
});
 
// Filtre categorie
document.querySelector("#categoryFilter").addEventListener("change", event => {
  state.category = event.target.value;
  render(state);
});
 
// Bouton Detail : un seul ecouteur sur le tableau
document.querySelector("#ordersBody").addEventListener("click", event => {
  const id = event.target.dataset.id;
 
  if (id) {
    const order = state.orders.find(
        o => o.id === Number(id));
    showOrderDetail(state, order);
  }
});
 
init();
 