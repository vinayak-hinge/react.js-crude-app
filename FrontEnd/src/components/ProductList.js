import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await fetch("http://localhost:5000/getProduct");

      if (!result.ok) {
        throw new Error("Failed to fetch products. Please try again later.");
      }

      const data = await result.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "Something went wrong. Please try again later.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
      });
          if (!result.ok) {
          throw new Error("Failed to delete product. Please try again later.");
         }

         const data = await result.json();
      if (data) {
        getProducts();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message || "Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      {/* <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             /> */}
             {error && <div className="error-message">{error}</div>}
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id} >Update </Link>
                            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
