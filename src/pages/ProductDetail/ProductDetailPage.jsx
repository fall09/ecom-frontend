import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const cartId = 4;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Product could not be loaded");
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(cartId, Number(id), quantity);
      alert("Product added to cart");
    } catch (error) {
      console.error(error);
      alert("Could not add to cart");
    }
  };

  if (errorMessage) {
    return <p className="detail-error">{errorMessage}</p>;
  }

  if (!product) {
    return <p className="detail-loading">Loading...</p>;
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <button
          className="close-button"
          onClick={() => navigate("/home")}
        >
          ✕
        </button>

        <div className="detail-image-wrapper">
          <img
            src={
              product.imgUrl && product.imgUrl.trim()
                ? product.imgUrl
                : "/shopping.png"
            }
            alt={product.name}
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <Link to="/home" className="back-link">
            ← Back to Products
          </Link>

          <h1>{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-stock">Stock: {product.stock}</p>
          <p className="detail-description">{product.description}</p>

          <div className="quantity-box">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <button className="add-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;