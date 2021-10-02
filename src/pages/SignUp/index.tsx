import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import Form from "components/Form";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="Auth">
      <Header />
      <Form authorization={false} />
      <Footer />
    </div>
  );
};

export default SignUp;
