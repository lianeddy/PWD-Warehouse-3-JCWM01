import React from "react";
import Card from "../components/Card";
import "./landing.css";

class Landing extends React.Component {
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
                    <label htmlFor="searchProductName">Product Name</label>
                    {/* filter by name */}
                    <input
                      onChange={this.inputHandler}
                      name="searchProductName"
                      type="text"
                      className="form-control mb-3"
                    />
                    {/* Filter by categories */}
                    <label htmlFor="searchCategory">Product Category</label>
                    <select
                      onChange={this.inputHandler}
                      name="searchCategory"
                      className="form-control"
                    >
                      <option value="">All Items</option>
                      <option value="kaos">Kaos</option>
                      <option value="celana">Celana</option>
                      <option value="aksesoris">Aksesoris</option>
                    </select>
                    <button
                      onClick={this.searchBtnHandler}
                      className="btn btn-primary mt-3"
                    >
                      Search
                    </button>
                  </div>

                  {/* dropdown Sort Products */}
                  <div className="card-body">
                    <label htmlFor="sortBy">Sort by</label>
                    <select
                      onChange={this.inputHandler}
                      name="sortBy"
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
                        // onClick={this.previousPageHandler}
                        className="btn btn-dark"
                      >
                        {"<"}
                      </button>
                      <div>Page 1 of 4</div>
                      <button
                        // disabled={this.state.page === this.state.maxPage}
                        // onClick={this.nextPageHandler}
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
              <Card />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
