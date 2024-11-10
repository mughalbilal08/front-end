import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

function EditProduct() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = () => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  };

  // Populate fields when a specific product is selected for editing
  const handleEditClick = (product) => {
    setSelectedProductId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
  };

  // Update product details
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { name, description, price, category };

    axios.put(`http://localhost:5000/products/${selectedProductId}`, updatedProduct)
      .then(response => {
        alert('Product updated successfully');
        fetchProducts(); // Refresh product list after update
        clearForm(); // Clear the form after updating
      })
      .catch(error => console.error("Error updating product:", error));
  };

  // Clear form fields
  const clearForm = () => {
    setSelectedProductId(null);
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleEditClick(product)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProductId && (
        <form onSubmit={handleSubmit}>
          <h3>Edit Product</h3>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button type="submit">Update Product</button>
          <button type="button" onClick={clearForm}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default EditProduct;
