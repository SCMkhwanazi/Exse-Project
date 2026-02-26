// A simple in-memory/localStorage-backed data service to mimic a backend
// Provides CRUD operations for users, orders, deliveries, etc.

const KEY_USERS = 'users';
const KEY_ORDERS = 'orders';
const KEY_DELIVERIES = 'deliveries';

export const DataService = {
  // Users
  getUsers: () => JSON.parse(localStorage.getItem(KEY_USERS) || '[]'),
  saveUsers: (users) => localStorage.setItem(KEY_USERS, JSON.stringify(users)),
  addUser: (user) => {
    const u = DataService.getUsers();
    u.push(user);
    DataService.saveUsers(u);
  },

  // Orders
  getOrders: () => JSON.parse(localStorage.getItem(KEY_ORDERS) || '[]'),
  saveOrders: (orders) => localStorage.setItem(KEY_ORDERS, JSON.stringify(orders)),
  addOrder: (order) => {
    const o = DataService.getOrders();
    o.push(order);
    DataService.saveOrders(o);
    return order;
  },
  updateOrder: (updated) => {
    const o = DataService.getOrders();
    const idx = o.findIndex(x => x.id === updated.id);
    if (idx >= 0) {
      o[idx] = updated;
      DataService.saveOrders(o);
    }
    return updated;
  },

  // Deliveries
  getDeliveries: () => JSON.parse(localStorage.getItem(KEY_DELIVERIES) || '[]'),
  saveDeliveries: (deliveries) => localStorage.setItem(KEY_DELIVERIES, JSON.stringify(deliveries)),
  addDelivery: (delivery) => {
    const d = DataService.getDeliveries();
    d.push(delivery);
    DataService.saveDeliveries(d);
    return delivery;
  },
  updateDelivery: (updated) => {
    const d = DataService.getDeliveries();
    const idx = d.findIndex(x => x.id === updated.id);
    if (idx >= 0) {
      d[idx] = updated;
      DataService.saveDeliveries(d);
    }
    return updated;
  }
};

export default DataService;
