import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../services/productService";
import { getAllCategories } from "../../services/categoryService";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

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
        setErrorMessage("Products could not be loaded");
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

  
  const getCategoryCount = (categoryName) => {
    return products.filter(
      (product) =>
        product.category &&
        product.category.name &&
        product.category.name.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <header className="home-header">
          <h1 className="home-title">Products</h1>
          <Link to="/cart" className="cart-link">
            Go to Cart
          </Link>
        </header>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <div className="filter-bar">
          <div className="filter-left">
            <label htmlFor="categorySelect" className="filter-label">
              Category
            </label>

            <select
              id="categorySelect"
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="ALL">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name} ({getCategoryCount(category.name)})
                </option>
              ))}
            </select>
          </div>

          <div className="filter-count-box">
            <span className="filter-count-label">Product Count</span>
            <span className="filter-count-value">{filteredProducts.length}</span>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className="product-card clickable-card"
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="product-image-wrapper">
                  <img
                    src={
                      product.imgUrl && product.imgUrl.trim()
                        ? product.imgUrl
                        : "/shopping.png"
                    }
                    alt={product.name}
                    className="product-image"
                  />
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price}</p>
                  <p className="product-stock">Stock: {product.stock}</p>

                  <div className="product-card-footer">
                    <span className="view-details-text">View Details</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products-text">No products found in this category</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;