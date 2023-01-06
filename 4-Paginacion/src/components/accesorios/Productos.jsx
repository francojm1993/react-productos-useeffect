import React from "react";

//Importamos el archivo CSS de este componente:
import "../../css/accesorios/Productos.css";

//Acá empieza el componente:
const Productos = ({ p }) => {
  return (
    <div key={p.product_id} className="producto">
      <h5 className="p-name">{p.product_name}</h5>
      <p className="p-brand">{p.product_brand}</p>
      <p className="p-price"> {`$ ${p.product_price}`} </p>
    </div>
  );
};

export default Productos;
