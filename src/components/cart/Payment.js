import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import CheckoutSteps from "./CheckoutSteps";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { createOrder,clearErrors } from "../../store/actions/orderActions";

import axios from "axios";

const options={
    style:{
        base:{
            fontSize:'16px',
        },
        invalid:{
            color:"#9e2146",
        }
    }
}

const Payment = () => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
    const alert = useAlert()
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const {error} = useSelector(state=>state.newOrder)
  useEffect(() => {}, []);
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  useEffect(() => {
    
    if(error){
      alert.error(error)
      dispatch(clearErrors)
    }

  }, [dispatch,alert,error])

  const order = {
    orderItems:cartItems,
    shippingInfo,
  }

  if(orderInfo){
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }
const paymentData = {
    amount:orderInfo.totalPrice,
}
  const submitHandler=async(e)=>{
    e.preventDefault();
    document.querySelector('#pay_btn').disabled=true;
    let res;
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        res = await axios.post('/api/payment/process',paymentData,config);
        const clientSecret = res.data.client_secret;
        if(!stripe || !elements){
            return;
        }
        const result = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardNumberElement),
                billing_details:{
                    name:user.name,
                    email:user.email,
                }
            }
        });
        if(result.error){
            alert.error(result.error.message);
            document.querySelector('#pay_btn').disabled=true;
        }else{
            // The Payment is processed or not
            if(result.paymentIntent.status==='succeeded'){
                
              order.paymentInfo= {
                id:result.paymentIntent.id,
                status:result.paymentIntent.status
              }

              dispatch(createOrder(order))

                history.push('/success');
            }else{
                alert.error('There is some issue while payment processing')
            }
        }
    } catch (err) {
        document.querySelector('#pay_btn').disabled=false;
        // alert.error(err.response.data.message);
        console.log(err);
    }
  }
  return (
    <React.Fragment>
      <Metadata title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement    
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}

              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}

              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}

              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {`- ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;
