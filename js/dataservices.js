// Charge UN fichier JSON
async function fetchData(path) {
  const response = await fetch(path);
 
  if (!response.ok) {
    throw new Error("Impossible de charger " + path + " (code " + response.status + ")");
  }
 
  return await response.json();
}
 
// Charge les 3 fichiers et les renvoie dans un seul objet
export async function loadAllData() {
  try {
    const [customers, products, orders] = await Promise.all([
      fetchData("./data/customers.json"),
      fetchData("./data/products.json"),
      fetchData("./data/orders.json")
    ]);
 
    return { customers, products, orders };
  } catch (error) {
    console.error("Erreur de chargement :", error);
    throw error; // app.js affichera le message dans la page
  }
}