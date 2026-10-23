// Etat central : on y stocke les donnees et les choix de l'utilisateur
export const state = {
  customers:[],     // vide au depart
  products:[],       // vide au depart
  orders: [],         // vide au depart
  search: "",         // texte de la recherche
  status: "all",      // statut choisi
  category: "all"     // categorie choisie
};