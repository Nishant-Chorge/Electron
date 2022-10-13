import React from "react";
import { useDispatch } from "react-redux";
import { addUser } from "Redux/components/user.js";
import {
  writeConfigRequest,
  useConfigInMainRequest,
} from "secure-electron-store";
import { useSelector } from "react-redux";

const AddUser = ({
  isFormVisible = true,
  toggleFormVisibility,
  defaultName = "",
  setName = () => {},
}) => {
  const [user, setUser] = React.useState(() => ({
    name: defaultName,
    email: "",
    mobile: "",
  }));

  const userList = useSelector((state) => state?.user) || [];

  React.useEffect(() => {
    window.api.store.send(useConfigInMainRequest);
  }, []);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target?.name]: e.target?.value,
    }));
  };

  const onSubmit = () => {
    if (!user.name) {
      return;
    }

    dispatch(addUser(user));
    window.api.store.send(writeConfigRequest, "user", [
      ...userList,
      { ...user, id: userList?.length + 1 },
    ]);

    setName(() => "");
    toggleFormVisibility();
  };

  const onFormSubmit = (e) => {
    e?.preventDefault();
    onSubmit();
  };

  const onFormReset = (e) => {
    e?.preventDefault();
    setUser(() => ({
      name: "",
      email: "",
      mobile: "",
    }));
    toggleFormVisibility();
  };

  return (
    <div className={`modal ${isFormVisible ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create a New Guest</p>
          <button
            className="delete"
            aria-label="close"
            onClick={toggleFormVisibility}
          />
        </header>
        <section className="modal-card-body">
          <form onSubmit={onFormSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Full Name"
                  name="name"
                  required={true}
                  onChange={onChange}
                  value={user?.name}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  onChange={onChange}
                  value={user?.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Mobile Number</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="mobile"
                  min={4555555555}
                  max={9999999999}
                  placeholder="Enter Mobile Number"
                  onChange={onChange}
                  value={user?.mobile}
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link"
                type="button"
                onClick={onSubmit}>
                Submit
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
                onClick={onFormReset}
                type="reset">
                Cancel
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AddUser;
