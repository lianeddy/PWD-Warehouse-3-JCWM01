import React from "react";
import Axios from "axios";
import Card from "../components/Card";
import "./landing.css";
import { URL_API } from "../../helper";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      pagination: {
        currentPage: 1,
        previousPage: 0,
        nextPage: 0,
        maxPage: 1,
        productsCount: 0,
      },
      filtering: {
        byName: "",
        byCategory: "",
        sort: "",
      },
    };
  }

  fetchProducts = () => {
    console.log(this.state.filtering.byCategory);
    Axios.get(
      `${URL_API}/products?page=${this.state.pagination.currentPage}&productName=${this.state.filtering.byName}&category=${this.state.filtering.byCategory}&sortBy=${this.state.filtering.sort}`
    )
      .then((res) => {
        this.setState({
          products: res.data.dataProduct,
          pagination: {
            ...this.state.pagination,
            previousPage:
              res.data.prevPage || this.state.pagination.previousPage,
            nextPage: res.data.nextPage || this.state.pagination.nextPage,
            productsCount:
              res.data.productsCount || this.state.pagination.productsCount,
            maxPage: res.data.maxPage || this.state.pagination.maxPage,
          },
        });

        this.renderProducts();
      })
      .catch((err) => {
        alert(err);
      });
  };

  renderProducts = () => {
    console.log(this.state.filtering.sort);

    return this.state.products.map((product) => {
      // console.log(product.nm_master_produk);
      // console.log(product.URL);

      return (
        <Card
          productName={product.nm_master_produk}
          price={product.harga}
          image={product.URL}
        />
      );
    });
  };

  componentDidMount() {
    this.fetchProducts();
    // [this.state.pagination.currentPage, this.state.filtering];
    this.renderProducts();
  }

  // componentDidUpdate(prepProps, prevState) {
  //   if (
  //     prevState.product !== this.state.products ||
  //     prevState.pagination !== this.state.pagination ||
  //     prevState.filtering !== this.state.filtering
  //   ) {
  //     this.fetchProducts();
  //   }
  // }

  nextPageHandler = () => {
    console.log(this.state.pagination.nextPage);
    this.setState({
      pagination: {
        ...this.state.pagination,
        currentPage: this.state.pagination.currentPage + 1,
      },
    });
    console.log(this.state.pagination.nextPage);
  };

  prevPageHandler = () => {
    console.log(this.state.pagination.previousPage);
    this.setState({
      pagination: {
        ...this.state.pagination,
        currentPage: this.state.pagination.currentPage - 1,
      },
    });
    console.log(this.state.pagination.previousPage);
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ filtering: { ...this.state.filtering, [name]: value } });
  };

  render() {
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
                  <div className="card-body">
                    <label htmlFor="byName">Product Name</label>
                    {/* filter by name */}
                    <input
                      onChange={this.inputHandler}
                      name="byName"
                      type="text"
                      className="form-control mb-3"
                    />
                    {/* Filter by categories */}
                    <label htmlFor="byCategory">Product Category</label>
                    <select
                      name="byCategory"
                      onChange={this.inputHandler}
                      className="form-control"
                    >
                      <option value="">All Items</option>
                      <option value="Sport Performance">
                        Sport Performance
                      </option>
                      <option value="Core / Neo">Core / Neo</option>
                      <option value="Originals">Originals</option>
                    </select>
                    {/* <button
                      onClick={this.searchBtnHandler}
                      className="btn btn-primary mt-3"
                    >
                      Search
                    </button> */}
                  </div>

                  {/* dropdown Sort Products */}
                  <div className="card-body">
                    <label htmlFor="sort">Sort by</label>
                    <select
                      onChange={this.inputHandler}
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
                        // disabled={this.state.page === 1}
                        onClick={this.prevPageHandler}
                        className="btn btn-dark"
                      >
                        {"<"}
                      </button>
                      <div>
                        Page {this.state.pagination.currentPage} of{" "}
                        {this.state.pagination.maxPage}
                      </div>
                      <button
                        // disabled={this.state.page === this.state.maxPage}
                        onClick={this.nextPageHandler}
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
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              {this.renderProducts()}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
