import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../services/productService";
import { getAllCategories } from "../../services/categoryService";
import ProductCard from "./../ProductCard/ProductCard";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await getAllProducts();
        const categoryData = await getAllCategories();

        setProducts(productData);
        setCategories(categoryData);
      } catch (error) {
        console.error(error);
        setErrorMessage("Data could not be loaded");
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "ALL") {
      return products;
    }

    return products.filter(
      (product) =>
        product.category &&
        product.category.name &&
        product.category.name.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [products, selectedCategory]);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Products</h1>
        <Link to="/cart" className="cart-link">
          Go to Cart
        </Link>
      </header>

      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <div className="category-filter">
        <button
          className={selectedCategory === "ALL" ? "active-category" : ""}
          onClick={() => setSelectedCategory("ALL")}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            className={
              selectedCategory === category.name ? "active-category" : ""
            }
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products-text">No products found in this category</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;