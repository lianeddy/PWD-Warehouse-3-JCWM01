import React from "react";
import Axios from "axios";
import { Carousel } from "react-bootstrap";
import { URL_API } from "../../../helper";

import "./landing.css";
import "./landing.rtl.css";

class Landing extends React.Component {
  state = {
    index: 0,
    products: [],
  };

  fecthDataProducts = async () => {
    try {
      const products = await Axios.get(`${URL_API}/products/landing`);

      console.log(products.data.data);
      const data = products.data.data;
      this.setState({ products: data });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.fecthDataProducts();
  }

  renderProducts = () => {
    return this.state.products.map((el, idx, arr) => {
      return (
        <>
          <hr class="featurette-divider" />

          <div class="row featurette">
            <div class={idx === 1 ? "col-md-7 order-md-2" : "col-md-7"}>
              <h2 class="featurette-heading">
                {el.nm_master_produk}
                <span class="text-muted">It’ll blow your mind.</span>
              </h2>
              <p class="lead">{el.description}</p>
            </div>
            <div class="col-md-5">
              <img
                class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                width="500"
                height="500"
                src={URL_API + el.URL}
                role="img"
                aria-label="Placeholder: 500x500"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              />
            </div>
          </div>
        </>
      );
    });
  };

  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-150"
              src={
                URL_API +
                "/images/imagescover-image/cover-landing1645694616457.jpg"
              }
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-150"
              src={
                URL_API +
                "/images/imagescover-image/cover-landing1645694763489.jpg"
              }
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-150"
              src={
                URL_API +
                "/images/imagescover-image/cover-landing1645694837770.jpg"
              }
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Marketing messaging and featurettes */}
        {/* ================================================== --> */}
        {/* <!-- Wrap the rest of the page in another container to center all the content. --> */}

        <div class="container marketing">
          {/* <!-- START THE FEATURETTES --> */}

          {this.renderProducts()}

          <hr class="featurette-divider" />

          {/* <!-- /END THE FEATURETTES --> */}
        </div>
        {/* <!-- /.container --> */}

        {/* <!-- FOOTER --> */}
        <footer class="container">
          <p class="float-end">
            <a href="#">Back to top</a>
          </p>
          <p>
            &copy; 2017–2021 Company, Inc. &middot;
            <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default Landing;
