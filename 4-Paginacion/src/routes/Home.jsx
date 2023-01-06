import { useEffect, useState } from "react";

//Importamos el archivo CSS de esta ruta:
import "../css/Home/Home.css";

//Importamos el archivo con la instancia de FetchApi para manejar peticiones al servidor:
import { FetchApi } from "../helpers/FetchApi";

//Importamos los componentes que necesitamos:
import Productos from "../components/accesorios/Productos";
import Loader from "../components/accesorios/Loader";

//RUTA:
const Home = () => {
  //State del array de los productos:
  const [productos, setProductos] = useState([]);
  //State para marcar los errores de la petición al server:
  const [errors, setErrors] = useState("");
  //State loading de la petición:
  const [loading, setLoading] = useState(true);
  // State de página que vamos a buscar:
  const [page, setPage] = useState(0);
  //State del total de páginas:
  const [totalPage, setTotalPage] = useState(0);
  //State de la página actual:
  const [currentPage, setCurrentPage] = useState(1);

  //useEffect para peticion async de los productos a la DB:
  useEffect(() => {
    //Activamos el loader para avisar que se está realizando una petición:
    setLoading(true);
    setProductos([]);
    //Petición:
    FetchApi.getData(
      `https://sharknetapi.onrender.com/api/v1/product/list?page=${page}`,
      ""
    ).then((res) => {
      //Cuando el servidor retorne una respuesta se quita el loading:
      setLoading(false);
      //Si no hay una respuesta, marcamos un error:
      if (!res) return setErrors("SERVER ERROR");
      //Si el status de la petición no es satisfactorio, el servidor me devuelve un mensaje de error, eso lo voy a renderizar con el state:
      else if (res.status !== 200) return setErrors(res.msg);
      //Si el status es satisfactorio asignamos los productos al state:
      else if (res.status === 200) {
        setProductos(res.data.products);
        console.log(res.data);
        setErrors("");
        //Actualizamos los states de las páginas:
        setTotalPage(res.data.totalPages);
        //Actualizamos la página actual:
        setCurrentPage(res.data.currentPage);
      }
    });
  }, [page]);

  return (
    <div>
      <h1>Productos</h1>

      {/**  ERRORES: **/}
      {errors && <p className="msg-error">{errors}</p>}

      {/**  section CONTENEDOR DONDE VAN A ESTAR LOS PRODUCTOS: **/}

      <section className="container-products">
        {/**  LOADING: **/}
        {loading && <Loader />}

        {/**  LISTA DE LOS PRODUCTOS RENDERIZADOS: **/}
        {/* Si el array está vacío es porque todavía no cargo o porque hubo un error */}
        {productos.length !== 0 &&
          productos.map((p) => <Productos key={p.product_id} p={p} />)}
      </section>

      {/**  BOTONES DE PAGINACIÓN:  **/}
      <div className="container-btn">
        {/* Validamos la página actual para desactivar o activar los botones */}
        {/** BOTÓN ATRAS**/}
        {currentPage > 1 ? (
          <button className="btn-pagination" onClick={() => setPage(page - 1)}>
            Atras
          </button>
        ) : (
          <button className="btn-pagination disabled" disabled>
            Atras
          </button>
        )}
        {/** BOTÓN SIGUIENTE**/}
        {currentPage < totalPage ? (
          <button className="btn-pagination" onClick={() => setPage(page + 1)}>
            Siguiente
          </button>
        ) : (
          <button className="btn-pagination disabled" disabled>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
