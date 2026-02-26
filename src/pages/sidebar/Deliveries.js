import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import DataService from '../../utils/dataService';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({
    customer: '',
    address: '',
    restaurant: '',
    total: '',
    driverEmail: '',
    status: 'Pending'
  });

  const load = () => {
    setDeliveries(DataService.getDeliveries());
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleAdd = () => {
    if (!form.customer || !form.address) return;
    DataService.addDelivery({
      ...form,
      id: `DEL-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    });
    setForm({
      customer: '',
      address: '',
      restaurant: '',
      total: '',
      driverEmail: '',
      status: 'Pending'
    });
    load();
  };

  const updateStatus = (id, status) => {
    const d = deliveries.find(x => x.id === id);
    if (!d) return;
    const updated = { ...d, status };
    DataService.updateDelivery(updated);
    load();
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Deliveries</h1>
        <p>View and assign deliveries to drivers</p>
      </div>

      <div className="content-section">
        <h2>Add New Delivery</h2>
        <div className="admin-search" style={{flexWrap:'wrap',gap:'10px'}}>
          <input id="customer" placeholder="Customer" value={form.customer} onChange={handleChange} style={{flex:'1 1 200px'}} />
          <input id="address" placeholder="Address" value={form.address} onChange={handleChange} style={{flex:'1 1 200px'}} />
          <input id="restaurant" placeholder="Restaurant" value={form.restaurant} onChange={handleChange} style={{flex:'1 1 150px'}} />
          <input id="total" placeholder="Total" value={form.total} onChange={handleChange} style={{flex:'1 1 100px'}} />
          <input id="driverEmail" placeholder="Driver Email" value={form.driverEmail} onChange={handleChange} style={{flex:'1 1 200px'}} />
          <button className="admin-btn" onClick={handleAdd}>Create</button>
        </div>
      </div>

      <div className="content-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Restaurant</th>
              <th>Total</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.customer}</td>
                <td>{d.address}</td>
                <td>{d.restaurant}</td>
                <td>{d.total}</td>
                <td>{d.driverEmail}</td>
                <td>
                  <select value={d.status} onChange={e => updateStatus(d.id, e.target.value)}>
                    <option>Pending</option>
                    <option>Accepted</option>
                    <option>In Transit</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td><button className="admin-btn" onClick={() => updateStatus(d.id, 'Completed')}>✔️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deliveries;
