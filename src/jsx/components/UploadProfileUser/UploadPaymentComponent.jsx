import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Button,
  Row,
  Container,
  Form,
  Card,
  Image,
} from "react-bootstrap";
import Axios from "axios";
import { URL_API } from "../../../helper";
import { connect } from "react-redux";
import { SwalFire } from "../../../utility/SwalFire";

const UploadProductComponent = ({
  title = "Input Product Images",
  isAdd = false,
  isUpdate = false,
  userGlobal,
  idUser = 0,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    inputImage: null,
    preview: null,
  });

  const formDataOnChangeHandler = (e) => {
    if (e.target.files[0]) {
      setData({
        ...data,
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const id_user = useSelector((state) => state.authReducer.id_user);
  const dataSelectorSQL = {};
  dataSelectorSQL.id_user = id_user;
  const uploadBtnHandler = () => {
    console.log(dataSelectorSQL);
    const { id_user, id_transaksi_master_produk } = dataSelectorSQL;
    setIsLoading(true);
    const formData = new FormData();

    if (isAdd) {
      let dataSend = {
        id_user: idUser,
        nm_file: "payment-image",
        create_user: idUser,
      };
      formData.append("data", JSON.stringify(dataSend));
      formData.append("file", data.addFile);
      Axios.post(
        `${URL_API}/transactions/paymentProof?id_user=${id_user}&id_transaksi_master_produk=${id_transaksi_master_produk}`,
        formData
      )
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
    //   formData.append("file", data.addFile);
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
  const selectHandler = (e) => {
    // FIXME
    const id = e.target.value;
    dataSelectorSQL.id_transaksi_master_produk = id;
    // console.log(e.target.value);
  };

  const OrderId = () => {
    const transaksiProduk = useSelector(
      (state) => state.transaksiProdukReducer.buyTransactionData
    );
    return transaksiProduk.map((el) => {
      return (
        <option value={el.id_transaksi_master_produk}>{el.invoice_code}</option>
      );
    });
  };

  return (
    <Container>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formProfileImages">
          <Form.Label column sm="2">
            {title}
          </Form.Label>
          <Col sm="10">
            <Form.Control type="file" onChange={formDataOnChangeHandler} />
          </Col>
        </Form.Group>
        <div className="mb-3">
          <Form.Select
            isValid={false}
            onChange={selectHandler}
            aria-label="Default select example"
          >
            <option value="">Order Number</option>
            {OrderId()}
          </Form.Select>
        </div>
        <Card className="mb-3">
          <Card.Header>Tampilan Image</Card.Header>
          <Card.Body>
            <Image src={data.preview} style={{ width: "100%" }} />
          </Card.Body>
        </Card>
        <Row>
          <Col sm="12" md="12" lg="12">
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                onClick={uploadBtnHandler}
                disabled={isLoading}
                size="lg"
              >
                UPLOAD
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     userGlobal: state.authReducer,
//     transaksiProdukReducer: state.transaksiProdukReducer,
//   };
// };

// const mapDispatchToProps = {};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(UploadProductComponent);

export default UploadProductComponent;
