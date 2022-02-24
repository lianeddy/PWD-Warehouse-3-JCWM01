import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Col, Container, Row, Card } from "react-bootstrap";

import "./productUser.css";

import CardProduct from "../../components/Card";

import { parseQueryString } from "../../../utility/parsing";
import { URL_API } from "../../../helper";

const ProductList = (props) => {
  const { id_category } = parseQueryString(props.location.search);
  console.log(id_category);
  const { product } = parseQueryString(props.location.search);
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

  const fetchProductsBySearch = async () => {
    try {
      if (product !== undefined) {
        let getProducts = await Axios.get(
          `${URL_API}/products/search-product?sortBy=${filtering.sort}&page=${pagination.currentPage}&productName=${product}`
        );

        const { products, count, prevPage, nextPage, maxPage } =
          getProducts.data.data;
        setProducts(products);
        setPagination({
          ...pagination,
          productsCount: count,
          previousPage: prevPage,
          nextPage,
          maxPage,
        });
        renderProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      if (id_category !== undefined) {
        const productDatas = await Axios.get(
          `${URL_API}/products/get-product-filter?id_category=${id_category}&page=${pagination.currentPage}&sortBy=${filtering.sort}`
        );
        const { products, productsCount, maxPage, nextPage, previousPage } =
          productDatas.data.data;

        setProducts(products);
        setPagination({
          ...pagination,
          productsCount,
          previousPage,
          nextPage,
          maxPage,
        });
        renderProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <CardProduct
          key={product.id_master_produk}
          id_master_produk={product.id_master_produk}
          productName={product.nm_master_produk}
          price={product.harga}
          image={URL_API + product.URL}
        />
      );
    });
  };

  useEffect(() => {
    fetchProductsBySearch();
    fetchFilteredProducts();
    renderProducts();
  }, [pagination.currentPage, filtering]);

  const nextPageHandler = () => {
    setPagination({
      currentPage: pagination.currentPage + 1,
    });
  };

  const prevPageHandler = () => {
    setPagination({
      currentPage: pagination.currentPage - 1,
    });
  };

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setInputProduct({ ...inputProduct, [name]: value });
    setFiltering({ ...filtering, [name]: value });
  };

  return (
    <div>
      {/* <NavbarView /> */}
      <div className="col-md-12 col-lg-12 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Find Your Product</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              {/* dropdown */}
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
            </div>
          </div>
        </div>
        <Card body className="mb-3">
          <div className="container-fluid">
            <div className="row"></div>
            <Container>
              <Row className="mt-4">
                <Col>
                  <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                      {renderProducts()}
                    </div>
                  </div>
                </Col>
              </Row>
              {/* Pagination */}
              <Row>
                <Col>
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
                </Col>
              </Row>
            </Container>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductList;
