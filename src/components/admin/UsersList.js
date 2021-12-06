import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import Metadata from "../layout/Metadata";
import { allUsers,deleteUser, clearErrors } from "../../store/actions/userActions";
import Sidebar from "./Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";
const UsersList = () => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    error,
    users = {},
  } = useSelector((state) => state.allUsers);
  const {isDeleted} = useSelector(state=>state.user);


  useEffect(() => {
    dispatch(allUsers());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success('Order Deleted Successfully')
      history.push('/admin/orders');
      dispatch({type:DELETE_USER_RESET})
    }
  }, [dispatch, alert, error, history,isDeleted]);
  const deleteUserHandler=(id)=>{
    dispatch(deleteUser(id))
  }

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <React.Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2 "
                 onClick={()=>deleteUserHandler(user._id)}
            >
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
      <Metadata title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Users</h1>
            {loading ? (
              <Loader />
            ) : (
              <React.Fragment>
                <MDBDataTable
                  data={setUsers()}
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

export default UsersList;
