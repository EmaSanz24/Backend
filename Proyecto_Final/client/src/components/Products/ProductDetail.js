export const ProductDetail = ({ data }) => {
  const { title, thumbnail, price, description, quantity } = data;
  return (
    <div className="ProductDetail">
      <img src={`${thumbnail}`} />
      <div className="ProductInfo">
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <span>${price}</span>
        </div>
        {/* <div>
          {qttSelected > 0 ? (
            <button>
              <Link className="toCart" to="/api/cart">
                ir al carrito
              </Link>
            </button>
          ) : (
            <Count setQttSelected={quantity} data={data} initial={quantity} />
          )}
        </div> */}
      </div>
    </div>
  );
};
