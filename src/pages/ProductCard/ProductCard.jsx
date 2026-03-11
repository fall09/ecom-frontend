import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-image-wrapper">
        <img
          src={product.imgUrl && product.imgUrl.trim() ? product.imgUrl : "/shopping.png"}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-stock">Stock: {product.stock}</p>
      </div>
    </div>
  );
};

export default ProductCard;