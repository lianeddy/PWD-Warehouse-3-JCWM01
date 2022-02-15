import React from "react";
import { Button, Card, Badge } from "react-bootstrap";

import "./styles.css";

class Orders extends React.Component {
  render() {
    return (
      <div class="d-flex align-items-start flex-column">
        <div class="col-md-12">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-120 position-relative">
            <div class="col p-2 d-flex flex-column position-static">
              <div class="d-flex align-items-start">
                <div class="col-auto d-none d-lg-block p-2">
                  <img
                    class="bd-placeholder-img"
                    width="120"
                    height="128"
                    src=""
                  />
                </div>
                <div class="d-flex align-items-start flex-column">
                  <div class="d-flex align-items-start p-1">
                    <strong class="d-inline-block pr-6 text-primary">
                      INV/20220214/MPL/2043930080
                    </strong>
                    <div class="mb-1 text-muted px-1">14 Feb 2022</div>
                  </div>
                  <span class="badge bg-primary p-1 mx-1">Belum Bayar</span>
                  <div class="d-flex align-items-start flex-column p-1">
                    <h7 class="mb-0">SOMETHINC GLOW</h7>
                    <p class="card-text mb-auto">1 barang x Rp59.000</p>
                    <p class="card-text mb-auto">+1 produk lainnya</p>
                    <a href="#">Detail Transasction</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-120 position-relative">
            <div class="col p-2 d-flex flex-column position-static">
              <div class="d-flex align-items-start">
                <div class="col-auto d-none d-lg-block p-2">
                  <img
                    class="bd-placeholder-img"
                    width="120"
                    height="128"
                    src=""
                  />
                </div>
                <div class="d-flex align-items-start flex-column">
                  <div class="d-flex align-items-start p-1">
                    <strong class="d-inline-block pr-6 text-primary">
                      INV/20220214/MPL/2043930080
                    </strong>
                    <div class="mb-1 text-muted px-1">14 Feb 2022</div>
                  </div>
                  <span class="badge bg-danger p-1 mx-1">Pesanan ditolak</span>
                  <div class="d-flex align-items-start flex-column p-1">
                    <h7 class="mb-0">SOMETHINC GLOW</h7>
                    <p class="card-text mb-auto">1 barang x Rp59.000</p>
                    <p class="card-text mb-auto">+1 produk lainnya</p>
                    <a href="#">Detail Transasction</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-120 position-relative">
            <div class="col p-2 d-flex flex-column position-static">
              <div class="d-flex align-items-start">
                <div class="col-auto d-none d-lg-block p-2">
                  <img
                    class="bd-placeholder-img"
                    width="120"
                    height="128"
                    src=""
                  />
                </div>
                <div class="d-flex align-items-start flex-column">
                  <div class="d-flex align-items-start p-1">
                    <strong class="d-inline-block pr-6 text-primary">
                      INV/20220214/MPL/2043930080
                    </strong>
                    <div class="mb-1 text-muted px-1">14 Feb 2022</div>
                  </div>
                  <span class="badge bg-success p-1 mx-1">
                    Pesanan diterima
                  </span>
                  <div class="d-flex align-items-start flex-column p-1">
                    <h7 class="mb-0">SOMETHINC GLOW</h7>
                    <p class="card-text mb-auto">1 barang x Rp59.000</p>
                    <a href="#">+1 produk lainnya</a>
                    <strong class="card-text mb-auto">
                      Total Belanja: Rp.150.000
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;