import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import UploadContent from "components/UploadContent";
import * as S from "store/selectors";
import "./Profile.css";

const Profile = () => {
  const history = useHistory();
  const auth = useSelector(S.selectAuth);

  React.useEffect(() => {
    if (!auth) {
      history.push("/");
    }
  }, [auth, history]);
  return (
    <div className="profile">
      <Header />
      <div className="body_container">
        <Sidebar />
        <div className="profile_data_container">
          <UploadContent />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
