import React, { useState, useEffect } from "react";
import Axios from "axios";
import CardProduct from "../components/Card";
import NavbarView from "../components/Navbar/NavbarView";
import "./Products.css";
import { URL_API } from "../../helper";
import { Col, Container, Row, Card } from "react-bootstrap";

const Landing = () => {
  const [products, setProducts] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    previousPage: 0,
    nextPage: 0,
    maxPage: 1,
    productsCount: 0,
  });

  const [filtering, setFiltering] = useState({
    byName: "",
    byCategory: "",
    sort: "",
  });

  const [inputProduct, setInputProduct] = useState({
    inputByName: "",
    inputByCategory: "",
  });

  const fetchProducts = () => {
    console.log(filtering.byCategory);
    Axios.get(
      `${URL_API}/products?page=${pagination.currentPage}&productName=${filtering.byName}&category=${filtering.byCategory}&sortBy=${filtering.sort}`
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
    console.log(filtering.sort);

    return products.map((product) => {
      return (
        <CardProduct
          id_master_produk={product.id_master_produk}
          productName={product.nm_master_produk}
          price={product.harga}
          image={URL_API + product.URL}
        />
      );
    });
  };

  useEffect(() => {
    fetchProducts();
    renderProducts();
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

    setInputProduct({ ...inputProduct, [name]: value });
    setFiltering({ ...filtering, [name]: value });
  };

  const searchBtnHandler = () => {
    setPagination({ ...pagination, currentPage: 1 });
    setFiltering({
      ...filtering,
      byName: inputProduct.inputByName,
      byCategory: inputProduct.inputByCategory,
    });
  };

  return (
    <div>
      {/* <NavbarView /> */}
      <div className="col-md-12 col-lg-12 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Find Your Product</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2"></div>
          </div>
        </div>
        <Card body className="mb-3">
          <div className="container-fluid">
            <div className="row"></div>
            <Container>
              <Row>
                <Col>
                  <div className="card">
                    <div className="card-body">
                      <label htmlFor="inputByName">Product Name</label>
                      {/* filter by name */}
                      <input
                        onChange={inputHandler}
                        name="inputByName"
                        type="text"
                        className="form-control mb-3"
                      />
                      {/* Filter by categories */}
                      <label htmlFor="inputByCategory">Product Category</label>
                      <select
                        name="inputByCategory"
                        onChange={inputHandler}
                        className="form-control"
                      >
                        <option value="">All Items</option>
                        <option value="Sport Performance">
                          Sport Performance
                        </option>
                        <option value="Core / Neo">Core / Neo</option>
                        <option value="Originals">Originals</option>
                      </select>
                      <button
                        onClick={searchBtnHandler}
                        className="btn btn-primary mt-3"
                      >
                        Search
                      </button>
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
                          disabled={
                            pagination.currentPage === pagination.maxPage
                          }
                          onClick={nextPageHandler}
                          className="btn btn-dark"
                        >
                          {">"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={9}>
                  <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                      {renderProducts()}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
