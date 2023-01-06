import { useEffect, useState } from "react";

//Importamos el archivo CSS de esta ruta:
import "./Home.css";

//Importamos el archivo con la instancia de FetchApi para manejar peticiones al servidor:
import { FetchApi } from "./FetchApi";

//RUTA:
const Home = () => {
  //State del array de los productos:
  const [productos, setProductos] = useState(null);

  //useEffect para peticion async de los productos a la DB:
  useEffect(() => {
    FetchApi.getData(
      "https://sharknetapi.onrender.com/api/v1/product/list",
      ""
    ).then((res) => {
      console.log(res.data.products);
      setProductos(res.data.products);
    });
  }, []);

  return (
    <div>
      <h1>Productos</h1>

      {/**  section CONTENEDOR DONDE VAN A ESTAR LOS PRODUCTOS: **/}
      <section className="container-products">
        {/**  LISTA DE LOS PRODUCTOS RENDERIZADOS: **/}
        {productos &&
          productos.map((p) => (
            <div key={p.product_id} className="producto">
              <h5 className="p-name">{p.product_name}</h5>
              <p className="p-brand">{p.product_brand}</p>
              <p className="p-price"> {`$ ${p.product_price}`} </p>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Home;
