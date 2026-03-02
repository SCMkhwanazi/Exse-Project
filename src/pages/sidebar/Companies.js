import React from 'react';
import './AdminDashboard.css';

const Companies = () => {
  const companyList = [
    {
      name: 'Mzamo Traders',
      email: 'ops@mzamotraders.co.za',
      status: 'Active',
      products: 2,
      orders: 'Open',
      lowStock: '5 items',
    },
    {
      name: 'RCO Groceries',
      email: 'hello@rcg-groceries.co.za',
      status: 'Active',
      products: 1,
      orders: 'Open',
      lowStock: '0 items',
    },
    {
      name: 'North Hills Market',
      email: 'team@nortshills.co.za',
      status: 'Pending',
      products: 0,
      orders: 'Closed',
      lowStock: '—',
    },
    {
      name: 'City Fresh Foods',
      email: 'contact@cityfresh.co.za',
      status: 'Active',
      products: 5,
      orders: 'Open',
      lowStock: '2 items',
    }
  ];

  const handleViewAs = (company) => {
    alert(`Switching to client view for ${company.name}`);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Companies</h1>
        <p>Manage registered companies</p>
      </div>
      <div className="content-section">
        <div style={{ display: 'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
          <h3>Clients / Companies</h3>
          <div>
            <button className="admin-btn admin-btn-outline" style={{marginRight:'8px'}}>Add company</button>
            <button className="admin-btn" onClick={() => alert('Seeding demo companies...')}>Seed demo companies</button>
          </div>
        </div>
        <div className="admin-search" style={{ marginBottom: '20px' }}>
          <select className="admin-input" style={{ maxWidth: '200px' }}>
            <option>All statuses</option>
            <option>Active</option>
            <option>Pending</option>
          </select>
          <div className="admin-search-box">
            <span>🔍</span>
            <input type="text" placeholder="Search company name / owner email..." />
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Owner Email</th>
              <th>Status</th>
              <th>Products</th>
              <th>Orders</th>
              <th>Low stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companyList.map(company => (
              <tr key={company.email}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td><span className={`status-badge ${company.status === 'Active' ? 'completed' : company.status === 'Pending' ? 'pending' : ''}`}>{company.status}</span></td>
                <td>{company.products}</td>
                <td>{company.orders}</td>
                <td>{company.lowStock}</td>
                <td>
                  <button className="admin-btn admin-btn-outline" style={{fontSize:'12px'}} onClick={() => handleViewAs(company)}>
                    View as Client
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Companies;
