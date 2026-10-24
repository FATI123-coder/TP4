// Affichage dans le DOM 
import {
  getCustomer, getOrderLines, getOrderTotal,
  getFilteredOrders, getCategories, getStats
} from "./selectors.js";

// Afficher un message d'erreur
export function showError(message) {
  const box = document.querySelector("#errorBox");
  box.textContent = message;
  box.classList.remove("d-none");
}

// Remplir les categories
export function fillCategories(state) {
  const select = document.querySelector("#categoryFilter");
  getCategories(state).forEach(name => {
    select.innerHTML += `<option value="${name}">${name}</option>`;
  });
}

// Afficher les indicateurs
function renderStats(state) {
  const stats = getStats(state);
  document.querySelector("#statCustomers").textContent = stats.customers;
  document.querySelector("#statProducts").textContent = stats.products;
  document.querySelector("#statOrders").textContent = stats.orders;
  document.querySelector("#statAmount").textContent = stats.totalAmount + " MAD";
}

// Afficher le tableau 
function renderOrders(state) {
  const orders = getFilteredOrders(state);
  const tbody = document.querySelector("#ordersBody");

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Aucune commande trouvee.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>#${order.id}</td>
      <td>${getCustomer(state, order).name}</td>
      <td>${order.date}</td>
      <td>${order.status}</td>
      <td>${getOrderTotal(state, order)} MAD</td>
      <td><button class="btn btn-sm btn-outline-secondary" data-id="${order.id}">Detail</button></td>
    </tr>
  `).join("");
}

// Fonction de rendu : aactualise l interface
export function render(state) {
  renderStats(state);
  renderOrders(state);
}

// affiche Detail d'une commande 
export function showOrderDetail(state, order) {
  const customer = getCustomer(state, order);

  const rows = getOrderLines(state, order).map(line => `
    <tr>
      <td>${line.name}</td>
      <td>${line.price} MAD</td>
      <td>${line.quantity}</td>
      <td>${line.total} MAD</td>
    </tr>
  `).join("");

  document.querySelector("#modalTitle").textContent = "Commande #" + order.id;
  document.querySelector("#modalBody").innerHTML = `
    <p>
      <strong>Client :</strong> ${customer.name}<br>
      <strong>Ville :</strong> ${customer.city}<br>
      <strong>Date :</strong> ${order.date}<br>
      <strong>Statut :</strong> ${order.status}
    </p>
    <table class="table table-sm">
      <thead><tr><th>Produit</th><th>Prix</th><th>Qte</th><th>Montant</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <h5 class="text-end">Total : ${getOrderTotal(state, order)} MAD</h5>
  `;

  new bootstrap.Modal(document.querySelector("#orderModal")).show();
}