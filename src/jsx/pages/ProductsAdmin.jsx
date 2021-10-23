import React, { useState, useEffect } from "react";
import Axios from "axios";
import CardAdmin from "../components/CardAdmin";
import "./landing.css";
import { URL_API, URL_WEB } from "../../helper";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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

  const fetchProducts = () => {
    console.log(userGlobal.id_role);
    Axios.get(
      `${URL_API}/products/product-admin?page=${pagination.currentPage}&sortBy=${filtering.sort}`
    )
      .then((res) => {
        setProducts(res.data.dataProduct);

        setPagination({
          ...pagination,
          previousPage: res.data.prevPage || pagination.previousPage,
          nextPage: res.data.nextPage || pagination.nextPage,
          productsCount: res.data.productsCount || pagination.productsCount,
          maxPage: res.data.maxPage || pagination.maxPage,
        });

        renderProducts();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const renderProducts = () => {
    console.log(products);

    return products.map((product) => {
      return (
        <CardAdmin
          id_master_produk={product.id_master_produk}
          productName={product.nm_master_produk}
          price={product.harga}
          image={URL_API + product.URL}
          total_stok={product.total_stok + " item tersedia"}
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
      {/* Navbar */}
      <div className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          Company name
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#">
              Sign out
            </a>
          </div>
        </div>
      </div>

      {/* Side Bar */}
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file"></span>
                    History Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="shopping-cart"></span>
                    MyCart
                  </a>
                </li>
              </ul>

              {/* Sort and filter products */}
              <div className="card">
                <div className="card-header">
                  <strong>Find your product</strong>
                </div>

                {/* dropdown Sort Products */}
                <div className="card-body">
                  <label htmlFor="sort">Sort by</label>
                  <select
                    onChange={inputHandler}
                    name="sort"
                    className="form-control"
                  >
                    <option value="">Default</option>
                    <option value="lowPrice">Lowest Price</option>
                    <option value="highPrice">Highest Price</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                  </select>
                </div>

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
              </div>
            </div>
          </nav>

          {/* Render content */}
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="album py-5 bg-light">
              <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  {renderProducts()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
