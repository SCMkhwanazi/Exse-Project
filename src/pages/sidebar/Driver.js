import React, { useState, useMemo } from "react";
import "./ViewDrivers.css";

const Driver = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 5;

  const drivers = [
    { id: 1, fullName: "John Smith", deliveries: 120, rating: 4.8 },
    { id: 2, fullName: "Thabo Mokoena", deliveries: 95, rating: 4.5 },
    { id: 3, fullName: "Sarah Johnson", deliveries: 150, rating: 4.9 },
    { id: 4, fullName: "Michael Brown", deliveries: 60, rating: 4.2 },
    { id: 5, fullName: "Lerato Dlamini", deliveries: 200, rating: 4.7 },
    { id: 6, fullName: "David Williams", deliveries: 88, rating: 4.4 },
    { id: 7, fullName: "Nomsa Khumalo", deliveries: 134, rating: 4.6 },
    { id: 8, fullName: "James Anderson", deliveries: 45, rating: 4.1 },
  ];

  // Filter Drivers
  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) =>
      driver.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination Logic
  const indexOfLast = currentPage * driversPerPage;
  const indexOfFirst = indexOfLast - driversPerPage;
  const currentDrivers = filteredDrivers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);

  return (
    <div className="drivers-page">
      <div className="drivers-header">
        <h1>Drivers</h1>
        <p>View and manage delivery drivers</p>
      </div>

      <div className="drivers-card">

        {/* Search */}
        <div className="drivers-controls">
          <input
            type="text"
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Table */}
        <table className="drivers-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Number of Deliveries</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {currentDrivers.length > 0 ? (
              currentDrivers.map((driver) => (
                <tr key={driver.id}>
                  <td>{driver.fullName}</td>
                  <td>{driver.deliveries}</td>
                  <td>{driver.rating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  No drivers found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Driver;