import React, { useState, useEffect, Fragment } from "react";
import { useHistory,useParams } from "react-router-dom";
import FormData from "form-data";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../layout/Metadata'
import { resetPassword, clearErrors } from "../../store/actions/userActions";

const NewPassword = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
      const history = useHistory();
      const params = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const { error, success } = useSelector(
      (state) => state.forgotPassword
    );
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (success) {
        alert.success("Password updated successfully");
        history.push('/login');
      }
    }, [dispatch, alert, error, success,history]);
    const submitHandler = (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.set("password", password);
      formData.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(params.token, formData));
    };
  
    return (
        <Fragment>
            <MetaData title={`New Password Reset`} />
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">New Password</h1>

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

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={e=>setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>

        </Fragment>
    )
}

export default NewPassword
