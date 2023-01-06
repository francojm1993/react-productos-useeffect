import { useEffect, useState } from "react";

//Importamos el archivo CSS de esta ruta:
import "../css/Home/Home.css";

//Importamos el archivo con la instancia de FetchApi para manejar peticiones al servidor:
import { FetchApi } from "../helpers/FetchApi";

//Importamos el componente Productos:
import Productos from "../components/accesorios/Productos";

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
          productos.map((p) => <Productos key={p.product_id} p={p} />)}
      </section>
    </div>
  );
};

export default Home;
