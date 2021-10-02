import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import Form from "components/Form";
import "./Auth.css";

const Auth = () => {
  return (
    <>
      <Header />
      <Form authorization />
      <Footer />
    </>
  );
};

export default Auth;
