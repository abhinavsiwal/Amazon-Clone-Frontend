import React, { useState, useEffect } from "react";
import { Link, useHistory,useLocation } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../layout/Loader";
import Metadata from "../layout/Metadata";

import { login, clearErrors } from "../../store/actions/userActions";

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

const redirect = location.search ? location.search.split('=')[1]:"/"

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    if (error) {
       alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history,redirect]);

  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(login(email,password))
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Metadata title={"Login"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={e=>setemail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Login;
