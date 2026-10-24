// Relier les donnees et calculer

// le nombre total de clients
export function getCustomer(state, order) {
  return state.customers.find(customer => customer.id === order.customerId);
}

// le nombre total de produits
export function getProduct(state, productId) {
  return state.products.find(product => product.id === productId);
}

// montant ligne = prix du produit x quantité
export function getLineTotal(state, item) {
  const product = getProduct(state, item.productId);
  return product.price * item.quantity;
}

// Montant total d'une commande = somme des lignes (forEach)
export function getOrderTotal(state, order) {
  let total = 0;
  order.items.forEach(item => {
    total = total + getLineTotal(state, item);
  });
  return total;
}

// Lignes completes d'une commande : map() fusionne item + produit + montant
export function getOrderLines(state, order) {
  return order.items.map(item => {
    const product = getProduct(state, item.productId);
    return {
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      total: getLineTotal(state, item)
    };
  });
}

// Est-ce que la commande contient un produit de cette categorie ?
function hasCategory(state, order, category) {
  return order.items.some(item => {
    return getProduct(state, item.productId).category === category;
  });
}

// Commandes visibles : recherche + statut + categorie (filter)
export function getFilteredOrders(state) {
  const search = state.search.toLowerCase().trim();

  return state.orders.filter(order => {
    const customer = getCustomer(state, order);

    const okSearch = customer.name.toLowerCase().includes(search);
    const okStatus = state.status === "all" || order.status === state.status;
    const okCategory = state.category === "all" || hasCategory(state, order, state.category);

    return okSearch && okStatus && okCategory;
  });
}

// Categories (map + filter)
export function getCategories(state) {
  const all = state.products.map(product => product.category);
  return all.filter((name, index) => all.indexOf(name) === index);
}

// Indicateurs
export function getStats(state) {
  let totalAmount = 0;
  state.orders.forEach(order => {
    totalAmount = totalAmount + getOrderTotal(state, order);
  });

  return {
    customers: state.customers.length,
    products: state.products.length,
    orders: state.orders.length,
    totalAmount: totalAmount
  };
}