import React, {  useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompnay] = useState("");
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState("");

  const addProduct = async () => {
    setError(false); 
    setApiError("");  

    if (!name || !price || !category || !company) {
      setError(true); 
      return; 
    }

    try {
      const userID = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, userID }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.message || "Failed to add product. Please try again.");
      }

      result = await result.json();
      console.log("Product added successfully:", result);
      setName("");
      setPrice("");
      setCategory("");
      setCompnay("");
    } catch (error) {
      console.error("API Error:", error);
      setApiError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      {apiError && <div className="error-message">{apiError}</div>}
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompnay(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
