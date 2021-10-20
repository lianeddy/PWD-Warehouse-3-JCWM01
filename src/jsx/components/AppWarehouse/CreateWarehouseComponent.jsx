import React, { useState } from "react";
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import Axios from "axios";
import { URL_API } from "../../../helper";
import { connect } from "react-redux";
import { SwalFire } from "../../../utility/SwalFire";
import InputAutocomplete from "../InputAutocomplete";
import {
  getDataFilterProvinsi,
  setLoadingFilterProvinsi,
  setTmpSelectedProvinsi,
  setSelectedProvinsi,
} from "../../../redux/actions/filterProvinsiAction";
import {
  getDataFilterKabkota,
  setLoadingFilterKabkota,
  setTmpSelectedKabkota,
  setSelectedKabkota,
} from "../../../redux/actions/filterKabkotaAction";

const CreateWarehouseComponent = ({
  title = "Input Profile Images",
  isAdd = true,
  isUpdate = false,
  userGlobal,
  idUser = 0,
  getDataFilterProvinsi, // Provinsi
  setLoadingFilterProvinsi, // Provinsi
  setTmpSelectedProvinsi, // Provinsi
  setSelectedProvinsi, // Provinsi
  getDataFilterKabkota, // Kabkota
  setLoadingFilterKabkota, // Kabkota
  setTmpSelectedKabkota, // Kabkota
  setSelectedKabkota, // Kabkota
  filterProvinsiGlobal,
  filterKabkotaGlobal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState({
  //   inputImage: null,
  //   preview: null,
  // });
  const [formData, setFormData] = useState({
    id_propinsi_now: null,
    id_propinsi_old: null,
    id_kabkota_now: null,
    id_kabkota_old: null,
  });

  const onInputchangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const saveBtnHandler = () => {
    setIsLoading(true);
    let dataSend = formData;

    if (isAdd) {
      // data.append("data", JSON.stringify(formData));
      dataSend = {
        ...dataSend,
        id_propinsi: dataSend.id_propinsi_now,
        id_kabkota: dataSend.id_kabkota_now,
      };
      // Delete data property yg dikirim
      delete dataSend.id_kabkota_now;
      delete dataSend.id_kabkota_old;
      delete dataSend.id_propinsi_now;
      delete dataSend.id_propinsi_old;

      Axios.post(`${URL_API}/users/warehouse`, dataSend)
        .then((result) => {
          const { code, message } = result.data;
          if (code == 1) {
            SwalFire.fire("Berhasil", message, "success");
          } else {
            SwalFire.fire("Perhatian", message, "warning");
          }
        })
        .catch((err) => {
          SwalFire.fire({
            icon: "error",
            title: "Oops...",
            text: "Server Error",
          });
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // if (isUpdate) {
    //   Axios.patch(`${URL_API}/users/profile-image/${idUser}`, formData)
    //     .then((result) => {
    //       const { code, message } = result.data;
    //       if (code == 1) {
    //         SwalFire.fire("Berhasil", message, "success");
    //       }
    //     })
    //     .catch((err) => {
    //       SwalFire.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Server Error",
    //       });
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // }
  };

  const handleChangeFilterProvinsi = (el) => {
    console.log("handleChange");
    console.log(el);
    setSelectedProvinsi(null);
    if (isAdd)
      setFormData({
        ...formData,
        id_propinsi_now: el.length != 0 ? el[0].id_propinsi : "",
      });
    else
      setFormData({
        ...formData,
        id_propinsi_old: el.length != 0 ? el[0].id_propinsi : "",
      });
  };

  const handleSearchFilterProvinsi = (query) => {
    setLoadingFilterProvinsi(true);
    getDataFilterProvinsi({ nm_propinsi: query });
  };

  const renderFilterProvinsi = (option, props) => (
    <>
      <span>{option.nm_propinsi}</span>
    </>
  );

  const handleChangeFilterKabKota = (el) => {
    console.log("handleChange");
    console.log(el);
    setSelectedKabkota(null);
    if (isAdd)
      setFormData({
        ...formData,
        id_kabkota_now: el.length !== 0 ? el[0].id_kabkota : null,
      });
    else
      setFormData({
        ...formData,
        id_kabkota_old: el.length !== 0 ? el[0].id_kabkota : null,
      });
  };

  const handleSearchFilterKabkota = (query) => {
    setLoadingFilterKabkota(true);
    let data = {
      nm_kabkota: query,
    };
    if (formData.id_propinsi_old != null) {
      data = {
        ...data,
        id_propinsi: formData.id_propinsi_old,
      };
    }
    if (formData.id_propinsi_now != null) {
      data = {
        ...data,
        id_propinsi: formData.id_propinsi_now,
      };
    }
    getDataFilterKabkota(data);
  };

  const renderFilterKabKota = (option, props) => (
    <>
      <span>{option.nm_kabkota}</span>
    </>
  );

  return (
    <Container>
      <p className="fs-4">Buat warehouse baru</p>
      <hr />
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="nm_warehouse">
          <Form.Label column sm="3" className="text-end">
            Nama Warehouse
          </Form.Label>
          <Col sm="7">
            <Form.Control type="text" onChange={onInputchangeHandler} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="kode_warehouse">
          <Form.Label column sm="3" className="text-end">
            Kode Warehouse
          </Form.Label>
          <Col sm="7">
            <Form.Control type="text" onChange={onInputchangeHandler} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="description">
          <Form.Label column sm="3" className="text-end">
            Deskripsi
          </Form.Label>
          <Col sm="7">
            <Form.Control
              as="textarea"
              style={{ height: "200px" }}
              onChange={onInputchangeHandler}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="alamat">
          <Form.Label column sm="3" className="text-end">
            Alamat lengkap
          </Form.Label>
          <Col sm="7">
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              onChange={onInputchangeHandler}
            />
          </Col>
        </Form.Group>
        <InputAutocomplete
          label="Nama Provinsi"
          onChange={(e) => handleChangeFilterProvinsi(e)}
          optionsProps={filterProvinsiGlobal.optionsFilter}
          isLoading={filterProvinsiGlobal.isLoading}
          handleSearch={handleSearchFilterProvinsi}
          placeholder="Ketik nama provinsi"
          id="filter-provinsi"
          renderMenuItemChildren={renderFilterProvinsi}
          labelKey={(options) => `${options.nm_propinsi}`}
          smLabel="12"
          mdLabel="3"
          lgLabel="3"
          smAsync="12"
          mdAsync="7"
          lgAsync="7"
          selected={filterProvinsiGlobal.selected}
        />
        <InputAutocomplete
          label="Nama Kabupaten / Kota"
          onChange={(e) => handleChangeFilterKabKota(e)}
          optionsProps={filterKabkotaGlobal.optionsFilter}
          isLoading={filterKabkotaGlobal.isLoadingFilterKabKota}
          handleSearch={handleSearchFilterKabkota}
          placeholder="Ketik nama kabupatern / kota"
          id="filter-kabkota"
          renderMenuItemChildren={renderFilterKabKota}
          // labelKey={(options) => `${options.type} ${options.nm_kabkota}`}
          labelKey="nm_kabkota"
          smLabel="12"
          mdLabel="3"
          lgLabel="3"
          smAsync="12"
          mdAsync="7"
          lgAsync="7"
          selected={filterKabkotaGlobal.selected}
        />
        <Row>
          <Col sm="3" md="3" lg="3" className="justify-content-end"></Col>
          <Col sm="7" md="7" lg="7" className="justify-content-end">
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                onClick={saveBtnHandler}
                disabled={isLoading}
                size="lg"
              >
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    userGlobal: state.authReducer,
    filterProvinsiGlobal: state.filterProvinsiReducer,
    filterKabkotaGlobal: state.filterKabkotaReducer,
  };
};

const mapDispatchToProps = {
  getDataFilterProvinsi, // Provinsi
  setLoadingFilterProvinsi, // Provinsi
  setTmpSelectedProvinsi, // Provinsi
  setSelectedProvinsi, // Provinsi
  getDataFilterKabkota, // Kabkota
  setLoadingFilterKabkota, // Kabkota
  setTmpSelectedKabkota, // Kabkota
  setSelectedKabkota, // Kabkota
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWarehouseComponent);
