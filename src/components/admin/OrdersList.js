import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import Metadata from "../layout/Metadata";
import { allOrders, clearErrors, deleteOrder } from "../../store/actions/orderActions";
import Sidebar from "./Sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
const OrdersList = () => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    error,
    orders = {},
  } = useSelector((state) => state.allOrders);
  const {isDeleted} = useSelector(state=>state.order);
  
  useEffect(() => {
    dispatch(allOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  
      if(isDeleted){
        alert.success('Order Deleted Successfully')
        history.push('/admin/orders');
        dispatch({type:DELETE_ORDER_RESET})
      }
  }, [dispatch, alert, error,history,isDeleted]);
  const deleteOrderHandler=(id)=>{
    dispatch(deleteOrder(id))
  }

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          sort: "asc",
          field: "numOfItems",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `Rs.${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <React.Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2 " onClick={()=>deleteOrderHandler(order._id)}>
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
      <Metadata title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>
            {loading ? (
              <Loader />
            ) : (
              <React.Fragment>
                <MDBDataTable
                  data={setOrders()}
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

export default OrdersList;
