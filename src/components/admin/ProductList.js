import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import Metadata from "../layout/Metadata";
import {
  getAdminProducts,
  clearErrors,
} from "../../store/actions/productActions";
import Sidebar from "./Sidebar";

const ProductList = () => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
      dispatch(getAdminProducts());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `Rs.${product.price}`,
        stock: product.stock,
        actions: (
          <React.Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2 ">
              <i className="fa fa-trash"></i>
            </button>
          </React.Fragment>
        ),
      });
    });
    return data;
  };

  return (
    <React.Fragment>
      <Metadata title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>
            {loading ? (
              <Loader />
            ) : (
              <React.Fragment>
                <MDBDataTable
                  data={setProducts()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              </React.Fragment>
            )}
          </Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
