import React from "react";
import "Styles/app.css";
import AddUser from "Pages/welcome/AddUser";
import UserList from "../user/UserList";
import { useSelector } from "react-redux";

const Home = () => {
  const [name, setName] = React.useState(() => "");
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const users = useSelector((state) => state?.user)?.length || 0;

  const onChange = (e) => {
    setName(e.currentTarget.value || "");
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const onCreateNew = () => {
    setIsFormVisible(() => true);
  };

  return (
    <div>
      <section className="home">
        <article className="home__search">
          <h1 className="home__search__title">User List</h1>
          <h6>{users} records</h6>
          <input
            type="text"
            className="home__search__input"
            onChange={onChange}
          />
          {isFormVisible ? (
            <AddUser
              isFormVisible={isFormVisible}
              toggleFormVisibility={toggleFormVisibility}
              defaultName={name}
              setName={setName}
            />
          ) : (
            <></>
          )}
        </article>
        <button onClick={onCreateNew}>Create new</button>
      </section>
      <UserList search={name} isReport={false} />
    </div>
  );
};

export default Home;
