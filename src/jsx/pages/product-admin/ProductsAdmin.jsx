import React, { useState, useEffect } from "react";
import Axios from "axios";
import CardAdmin from "../../components/CardAdmin";
import "./productAdmin.css";
import { URL_API, URL_WEB } from "../../../helper";
import { useSelector } from "react-redux";
import { Col, Container, Row, Card } from "react-bootstrap";
import productAdminServices from "./productAdmin.services";

const Landing = () => {
  const [products, setProducts] = useState([]);

  const userGlobal = useSelector((state) => state.authReducer);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    previousPage: 0,
    nextPage: 0,
    maxPage: 1,
    productsCount: 0,
  });

  const [filtering, setFiltering] = useState({
    sort: "",
  });

  const fetchProducts = async () => {
    try {
      const getProducts = await productAdminServices.getProducts(
        pagination.currentPage,
        filtering.sort
      );
      const { products, productsCount, previousPage, nextPage, maxPage } =
        getProducts.data.data;
      setProducts(products);

      setPagination({
        ...pagination,
        previousPage,
        nextPage,
        productsCount,
        maxPage,
      });

      renderProducts();
    } catch (e) {
      alert(e);
    }
  };

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <CardAdmin
          key={product.id_master_produk}
          id_master_produk={product.id_master_produk}
          productName={product.nm_master_produk}
          price={product.harga}
          image={URL_API + product.URL}
          total_stok={product.stok + " item tersedia"}
        />
      );
    });
  };

  useEffect(() => {
    {
      userGlobal.id_role === 3
        ? window.location.assign(`${URL_WEB}/product-list`)
        : fetchProducts();
      renderProducts();
    }
  }, [pagination.currentPage, filtering]);

  const nextPageHandler = () => {
    console.log(pagination.nextPage);

    setPagination({
      currentPage: pagination.currentPage + 1,
    });
    console.log(pagination.nextPage);
  };

  const prevPageHandler = () => {
    console.log(pagination.previousPage);
    setPagination({
      currentPage: pagination.currentPage - 1,
    });
    console.log(pagination.previousPage);
  };

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    //   setInputProduct({ ...inputProduct, [name]: value });
    setFiltering({ ...filtering, [name]: value });
  };

  return (
    <div>
      <div className="col-md-12 col-lg-12 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Manage Product</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <div className="card-body">
                <label htmlFor="sort">Sort by</label>
                <select
                  onChange={inputHandler}
                  name="sort"
                  className="form-control"
                >
                  <option value="">Default</option>
                  <option value="lowStock">Lowest Stock</option>
                  <option value="highStock">Highest Stock</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
              {/* <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.tambahModalHandler}
                >
                  &#10147; Kirim Permintaan
                </button> */}
            </div>
          </div>
        </div>
        <Card body className="mb-3">
          <div className="container-fluid">
            <div className="row"></div>
            <Container>
              {/* <div className="card"> */}
              {/* <div className="card-header">
                  <strong>Find your product</strong>
                </div> */}

              {/* dropdown Sort Products */}

              {/* </div> */}

              {/* <div class="album py-5 bg-light"> */}
              <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  {renderProducts()}
                </div>
              </div>
              {/* </div> */}
              {/* Pagination */}
              <div className="mt-3">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button
                    disabled={pagination.currentPage === 1}
                    onClick={prevPageHandler}
                    className="btn btn-dark"
                  >
                    {"<"}
                  </button>
                  <div>
                    Page {pagination.currentPage} of {pagination.maxPage}
                  </div>
                  <button
                    disabled={pagination.currentPage === pagination.maxPage}
                    onClick={nextPageHandler}
                    className="btn btn-dark"
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
