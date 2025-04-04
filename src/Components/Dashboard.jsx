import React, { useState } from 'react';
import { useUsers } from '../services/users/getusers';
import { useCreateUser } from '../services/users/createusers';
import { useUpdateUser } from '../services/users/updateusers';
import { useDeleteUser } from '../services/users/deleteusers';
import styles from './Dashboard.module.css';

function Dashboard() {
  // when the dashboard component is first rendered, it immediately calls the custom TanStack Query hook useUsers()
  //duting my data fteching my isloading will be true and users isError error will have undefined false and null if fetchig fails is loading willl be false isError will be trur and error will be obcetc from the api call
  const { data: users, isLoading, isError, error } = useUsers();
  const { mutate: createUser, isLoading: isCreating, error: createError } = useCreateUser();
  const { mutate: updateUser, isLoading: isUpdating, error: updateError } = useUpdateUser();
  const { mutate: deleteUser, isLoading: isDeleting, error: deleteError } = useDeleteUser();
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = (e) => {
    e.preventDefault();
    createUser(newUser); // Calls the createUser mutation while the createtioniscreating will be true
    setNewUser({ name: '', email: '' });//after creating user blank it
  };

  const handleEdit = (user) => {
    setEditUser(user);
    //This will scroll whenever I click on edit user it will simply scroll to the edit user page
    setTimeout(() => {
      const editUserSection = document.getElementById('editUserSection');
      if (editUserSection) {
        editUserSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser({ id: editUser.id, userData: editUser });
    setEditUser(null);//when i call the state setter function in react, it updates the state variable with the new value i provide which is null Setting editUser to null will cause the conditional rendering logic in my Dashboard component to evaluate the editUser state as falsy.
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  if (isLoading) return <div className={styles.dashboardContainer}>Loading...</div>;
  if (isError) return <div className={styles.dashboardContainer}>Error: {error.message}</div>;

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
            {users && users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className={styles.actionsContainer}>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                  {deleteError && <p className={styles.errorMessage}>Error deleting: {deleteError.message}</p>}
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
          <button type="submit" className={styles.formButton} disabled={isCreating}>
            {isCreating ? 'Adding...' : 'Add User'}
          </button>
          {createError && <p className={styles.errorMessage}>Error adding: {createError.message}</p>}
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
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="editEmail">Email:</label>
              <input
                type="email"
                id="editEmail"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
            </div>
            <button type="submit" className={styles.formButton} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
            {updateError && <p className={styles.errorMessage}>Error updating: {updateError.message}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;