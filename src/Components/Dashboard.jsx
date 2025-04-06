// import React, { useEffect, useState } from "react";
// import { useUsers } from "../services/users/getusers";
// import { useCreateUser } from "../services/users/createusers";
// import { useUpdateUser } from "../services/users/updateusers";
// import { useDeleteUser } from "../services/users/deleteusers";
// import styles from "./Dashboard.module.css";

// function Dashboard() {
//   // when the dashboard component is first rendered, it immediately calls the custom TanStack Query hook useUsers()
//   //duting my data fteching my isloading will be true and users isError error will have undefined
//   // false and null if fetchig fails is loading willl be false isError will be trur and error will be obcetc from the api call
//   const { data: users, isLoading, isError, error } = useUsers();
//   const {
//     mutate: createUser,
//     isLoading: isCreating,
//     error: createError,
//   } = useCreateUser();
//   const {
//     mutate: updateUser,
//     isLoading: isUpdating,
//     error: updateError,
//   } = useUpdateUser();
//   const {
//     mutate: deleteUser,
//     isLoading:isDeleting,
//     error: deleteError,
//   } = useDeleteUser();
//   const [newUser, setNewUser] = useState({ name: "", email: "" });
//   const [editUser, setEditUser] = useState(null);
//   const [deletingUsers, setDeletingUsers] = useState({});

//   // const handleAddUser = (e) => {
//   //   e.preventDefault();
//   //   createUser(newUser); // Calls the createUser mutation while the createtion iscreating will be true
//   //   setNewUser({ name: "", email: "" }); //after creating user blank it
//   // };
//   const handleAddUser = (e) => {
//     e.preventDefault();
//     console.log("Before createUser: ", isLoading);
//     createUser(newUser); // Calls the createUser mutation while creation is in progress
//     // Set the deleting status for the new user to false
//     console.log("After createUser: ", isLoading);
//     setDeletingUsers((prevState) => ({
//       ...prevState,
//       [newUser.id]: false, // assuming newUser has an id after creation
//     }));
//     setNewUser({ name: "", email: "" }); // reset the new user input fields
//   };

//   const handleEdit = (user) => {
//     setEditUser(user);
//     //This will scroll whenever I click on edit user it will simply scroll to the edit
//     // user page
//     setTimeout(() => {
//       const editUserSection = document.getElementById("editUserSection");
//       if (editUserSection) {
//         editUserSection.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     }, 0);
//   };

//   const handleUpdateUser = (e) => {
//     e.preventDefault();
//     updateUser({ id: editUser.id, userData: editUser });
//     setEditUser(null); //when i call the state setter function in react, it updates the
//     // state variable with the new value i provide which is null Setting editUser to
//     // null will cause the conditional rendering logic in my Dashboard component
//     // to evaluate the editUser state as falsy.
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       //what is happening whenever I click on delete button it takes previous state remaining
//       //remaining button as it is and only just overwrite that clicked delete id button it will
//       //set it false>>true so that we are able to see deleting and disabled button for that entry only
//       setDeletingUsers((prevState) => ({ ...prevState, [id]: true }));
//       deleteUser(id).finally(() => {
//         // setting the user back to not deleting after deletion already we havve
//         setDeletingUsers((prevState) => ({ ...prevState, [id]: false }));
//       });
//     }
//   };

//   if (isLoading)
//     return <div className={styles.dashboardContainer}>Loading...</div>;
//   if (isError)
//     return (
//       <div className={styles.dashboardContainer}>Error: {error.message}</div>
//     );

//   return (
//     <div className={styles.dashboardContainer}>
//       <h1 className={styles.dashboardTitle}>User Dashboard</h1>

//       <div className={styles.userTableContainer}>
//         <table className={styles.userTable}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users &&
//               users.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td className={styles.actionsContainer}>
//                     <button onClick={() => handleEdit(user)}>Edit</button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       disabled={deletingUsers[user.id]} // disabling button and also deleting based on what i selecting
//                     >
//                       {deletingUsers[user.id] ? "Deleting..." : "Delete"}
//                     </button>
//                     {deleteError && (
//                       <p className={styles.errorMessage}>
//                         Error deleting: {deleteError.message}
//                       </p>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       <div className={styles.addFormContainer}>
//         <h2 className={styles.formTitle}>Add New User</h2>
//         <form onSubmit={handleAddUser}>
//           <div className={styles.formGroup}>
//             <label htmlFor="newName">Name:</label>
//             <input
//               type="text"
//               id="newName"
//               placeholder="Name"
//               value={newUser.name}
//               onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="newEmail">Email:</label>
//             <input
//               type="email"
//               id="newEmail"
//               placeholder="Email"
//               value={newUser.email}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, email: e.target.value })
//               }
//             />
//           </div>
//           <button
//             type="submit"
//             className={styles.formButton}
//             disabled={isCreating}
//           >
//             {isCreating ? "Adding..." : "Add User"}
//           </button>
//           {createError && (
//             <p className={styles.errorMessage}>
//               Error adding: {createError.message}
//             </p>
//           )}
//         </form>
//       </div>

//       {editUser && (
//         <div className={styles.editFormContainer} id="editUserSection">
//           <h2 className={styles.formTitle}>Edit User</h2>
//           <form onSubmit={handleUpdateUser}>
//             <div className={styles.formGroup}>
//               <label htmlFor="editName">Name:</label>
//               <input
//                 type="text"
//                 id="editName"
//                 value={editUser.name}
//                 onChange={(e) =>
//                   setEditUser({ ...editUser, name: e.target.value })
//                 }
//               />
//             </div>
//             <div className={styles.formGroup}>
//               <label htmlFor="editEmail">Email:</label>
//               <input
//                 type="email"
//                 id="editEmail"
//                 value={editUser.email}
//                 onChange={(e) =>
//                   setEditUser({ ...editUser, email: e.target.value })
//                 }
//               />
//             </div>
//             <button
//               type="submit"
//               className={styles.formButton}
//               disabled={isUpdating}
//             >
//               {isUpdating ? "Updating..." : "Update"}
//             </button>
//             {updateError && (
//               <p className={styles.errorMessage}>
//                 Error updating: {updateError.message}
//               </p>
//             )}
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useUsers } from "../services/users/getusers";
import { useCreateUser } from "../services/users/createusers";
import { useUpdateUser } from "../services/users/updateusers";
import { useDeleteUser } from "../services/users/deleteusers";
import styles from "./Dashboard.module.css";

function Dashboard() {
  // Fetching users
  const { data: users, isLoading, isError, error } = useUsers();

  // when the dashboard component is first rendered, it immediately calls the custom TanStack Query hook useUsers()
//   //duting my data fteching my isloading will be true and users isError error will have undefined
//   // false and null if fetchig fails is loading willl be false isError will be trur and error will be obcetc from the api call
  const {
    mutate: createUser,
    isLoading: isCreating,
    error: createError,
  } = useCreateUser();

  const {
    mutate: updateUser,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateUser();

  const {
    mutate: deleteUser,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteUser();

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editUser, setEditUser] = useState(null);
  const [deletingUsers, setDeletingUsers] = useState({});

  useEffect(() => {
    console.log("isCreating changed:", isCreating); // Log when isCreating state changes
  }, [isCreating]);

  const handleAddUser = (e) => {
    e.preventDefault();
    createUser(newUser); // Call the createUser mutation
    setNewUser({ name: "", email: "" }); // Reset the new user input fields after submission
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setTimeout(() => {
      const editUserSection = document.getElementById("editUserSection");
      if (editUserSection) {
        editUserSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser({ id: editUser.id, userData: editUser });
    setEditUser(null); // Reset the editUser state after update
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setDeletingUsers((prevState) => ({ ...prevState, [id]: true })); // Show deleting state for the selected user
      deleteUser(id).finally(() => {
        setDeletingUsers((prevState) => ({ ...prevState, [id]: false })); // Reset deleting state after deletion
      });
    }
  };

  if (isLoading)
    return <div className={styles.dashboardContainer}>Loading...</div>;

  if (isError)
    return <div className={styles.dashboardContainer}>Error: {error.message}</div>;

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>User Dashboard</h1>

      <div className={styles.userTableContainer}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className={styles.actionsContainer}>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingUsers[user.id]} // Disable if deleting
                    >
                      {deletingUsers[user.id] ? "Deleting..." : "Delete"}
                    </button>
                    {deleteError && (
                      <p className={styles.errorMessage}>
                        Error deleting: {deleteError.message}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className={styles.addFormContainer}>
        <h2 className={styles.formTitle}>Add New User</h2>
        <form onSubmit={handleAddUser}>
          <div className={styles.formGroup}>
            <label htmlFor="newName">Name:</label>
            <input
              type="text"
              id="newName"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newEmail">Email:</label>
            <input
              type="email"
              id="newEmail"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className={styles.formButton}
            disabled={isCreating} // Disable the button when creating
          >
            {isCreating ? "Adding..." : "Add User"}
          </button>
          {createError && (
            <p className={styles.errorMessage}>
              Error adding: {createError.message}
            </p>
          )}
        </form>
      </div>

      {editUser && (
        <div className={styles.editFormContainer} id="editUserSection">
          <h2 className={styles.formTitle}>Edit User</h2>
          <form onSubmit={handleUpdateUser}>
            <div className={styles.formGroup}>
              <label htmlFor="editName">Name:</label>
              <input
                type="text"
                id="editName"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="editEmail">Email:</label>
              <input
                type="email"
                id="editEmail"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className={styles.formButton}
              disabled={isUpdating} // Disable the button while updating
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
            {updateError && (
              <p className={styles.errorMessage}>
                Error updating: {updateError.message}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
