import React from "react";
import { useSelector } from "react-redux";
import "./list.css";

const UserList = ({ search = "", isReport = true }) => {
  const users = useSelector((state) => state?.user);
  const filteredUsers = () => {
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) return users;
    if (Number.isNaN(Number(searchTerm))) {
      return users.filter(
        (user) =>
          user?.email?.toLowerCase().includes(searchTerm) ||
          user.name.toLowerCase().includes(search.toLowerCase())
      );
    } else return users.filter((user) => user.mobile.startsWith(searchTerm));
  };

  const matched = filteredUsers();

  const fields = (
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Mobile</th>
      {isReport ? (
        <>
          <th>Joined at</th>
          <th>Group</th>
        </>
      ) : (
        <>
          <th>Status</th>
        </>
      )}
    </tr>
  );

  return (
    <div className="table_container">
      {matched.length ? (
        <table className="table table is-striped">
          <thead>{fields}</thead>
          <tfoot>{fields}</tfoot>
          <tbody>
            {matched?.map((user) => (
              <tr key={user?.id}>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.mobile}</td>
                {isReport ? (
                  <>
                    <td>{user?.joinedAt}</td>
                    <td>{user?.group}</td>
                  </>
                ) : (
                  <td>
                    <button>{user?.status}</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserList;
