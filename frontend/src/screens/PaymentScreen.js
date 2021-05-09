import React, { useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

import FormContainer from "../components/FormContainer";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }
  // Above lines are for retrieving any past data from localStorage. This is useful, in case the user is going to a different page
  // and then coming back to shippingScreen. Hence, they won't have to enter the data again.
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-success"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: "50%" }}
        ></div>
      </div>
      <CheckoutSteps step1 step2 step3 />
      <h1 className='text-dark mb-3'>Payment Method</h1>

      <Form className="d-grid gap-5" onSubmit={submitHandler}>
        <Form.Group>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              name="paymentMethod"
              value="PayPal"
              checked
              id="paypal"
              className="text-dark mb-3"
              onClick={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="RazorPay"
              name="paymentMethod"
              value="RazorPay"
              id="RazorPay"
              className="text-dark mb-3"
              onClick={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              name="paymentMethod"
              value="Stripe"
              id="stripe"
              className="text-dark"
              onClick={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Container className="d-grid">
          <Button type="submit" variant="primary" className="btn-outline-dark">
            Continue
          </Button>
        </Container>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
