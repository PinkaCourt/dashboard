import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Content from "components/Content";
import * as S from "store/selectors";
import "./Dashboard.css";

const Dashboard = () => {
  const history = useHistory();
  const auth = useSelector(S.selectAuth);

  React.useEffect(() => {
    if (!auth) {
      history.push("/");
    }
  }, [auth, history]);

  return (
    <div className="dashboard">
      <Header />
      <div className="body_container">
        <Sidebar />
        <div className="dashboard_data_container">
          <Content />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
