import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { baseService } from "../network/services/baseService";
import { addProduct } from "../redux/CartSlice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quanty, setQuanty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const data = await baseService.get("/products");
      setProducts(data.slice(0, 10));
    } catch (error) {
      console.log("Get products error", error);
    }
  };

  const handleClick = (product) => {
    dispatch(addProduct({ ...product, quantity: quanty }));
    setQuanty(1);
  };

  return (
    <div className="products">
      {products?.map((product, key) => (
        <div key={key} className="card" style={{ width: "18rem" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfASAg9CkTL6JVWk3bFNHibc_ArzuS9liaVg&usqp=CAU"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{product?.name}</h5>
            <p className="card-text">{product?.quantityPerUnit}</p>
            <div className="addcontainer">
              <Link to={`/products/${product?.id}`}>
                <button className="addbutton">Go to Detail</button>
              </Link>

              <div className="amount">
                <input
                  onChange={(e) => {
                    setQuanty(e.target.value);
                  }}
                  placeholder="1"
                  type="number"
                  className="input"
                />
              </div>
              <button
                onClick={() => handleClick(product)}
                className="addbutton"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
