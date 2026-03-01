import React, { useState } from "react";
import "./ViewProducts.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Dairy", price: 12.99, stock: 25 },
    { id: 2, name: "Snacks", price: 14.99, stock: 18 },
    { id: 3, name: "Stationary", price: 299.99, stock: 40 },
    { id: 4, name: "Electronics", price: 249.99, stock: 12 },
    { id: 5, name: "Bread", price: 19.99, stock: 5 },
    { id: 6, name: "Milk", price: 15.99, stock: 8 },
    { id: 7, name: "Chips", price: 9.99, stock: 30 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* ---------------- Modal ---------------- */

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", stock: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...formData, id: p.id } : p
        )
      );
    } else {
      setProducts([
        ...products,
        { ...formData, id: Date.now() },
      ]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  /* ---------------- Search + Filter ---------------- */

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      filter === "Low Stock" ? product.stock < 10 : true
    );

  /* ---------------- Pagination ---------------- */

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="view-products">
      <div className="vp-header">
        <h1>Store Products</h1>
        <p>Manage the products your store offers</p>
      </div>

      <div className="vp-container">
        <div className="table-card">

          {/* Top Controls */}
          <div className="table-header">
            <div className="controls">
              <input
                type="text"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Products</option>
                <option value="Low Stock">Low Stock (&lt;10)</option>
              </select>
            </div>

            <button className="add-product-btn" onClick={openAddModal}>
              + Add Product
            </button>
          </div>

          {/* Table */}
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (R)</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>R{product.price}</td>
                  <td>{product.stock}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={
                  currentPage === index + 1 ? "page-btn active" : "page-btn"
                }
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;