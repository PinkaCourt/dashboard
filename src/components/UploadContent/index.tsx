import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as A from "store/actions";
import * as S from "store/selectors";
import "./UploadContent.css";

const UploadContent = () => {
  const [changedName, setChangedName] = React.useState("");
  const [fileName, setFileName] = React.useState("Upload new");
  const [URL, setURL] = React.useState("");
  const [uploadedFile, setUploadedFile] = React.useState<string>("");

  const fileInput = React.createRef<HTMLInputElement>();

  const user = useSelector(S.selectUser);
  const dispatch = useDispatch();

  const handleNameChange = (event: { target: { value: string } }) => {
    setChangedName(event.target.value);
  };

  const handleUpload = () => {
    if (fileName !== "Upload new") {
      dispatch(A.updateUserAvatar(uploadedFile));
    }

    if (changedName !== "") {
      dispatch(A.updateUserName(changedName));
    }
  };

  const encodeImageFileAsURL = () => {
    const { current } = fileInput;
    const contentFiles = current && current.files;

    if (!contentFiles) {
      return;
    }

    const file = contentFiles[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      const fullUrl = String(reader.result);
      const dataBase64 = fullUrl.split(",")[1];
      setFileName(file.name);
      setUploadedFile(dataBase64);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (!user) {
      return;
    }
    const { name, avatar } = user;

    if (name !== null) {
      setChangedName(name);
    }

    const src =
      avatar === null ? "/ava.jpg" : `data:image/jpeg;base64,${avatar}`;

    setURL(src);
  }, [user]);

  return (
    <>
      <div className="upload_container">
        <div className="choose_container">
          <img className="upload_img" src={URL} alt="dick pic" />
          <label className="choose_link">
            <input
              className="choose_button"
              type="file"
              accept="image/jpeg,image/png"
              onChange={encodeImageFileAsURL}
              ref={fileInput}
            />
            {fileName}
          </label>
          <label className="upload_label">
            email
            <input className="upload_email" value={user?.email} readOnly />
          </label>
          <label className="upload_label">
            name
            <input
              className="upload_name"
              onChange={handleNameChange}
              autoComplete="on"
              value={changedName}
            />
          </label>
        </div>
      </div>
      <button className="upload_button" onClick={handleUpload}>
        Upload
      </button>
    </>
  );
};

export default UploadContent;
