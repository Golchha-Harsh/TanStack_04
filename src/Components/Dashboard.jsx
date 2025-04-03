import React, { useState } from 'react';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../services/users';

function Dashboard() {
  const { data: users, isLoading, isError, error } = useUsers();//hook is called
  const { mutate: createUser, isLoading: isCreating, error: createError } = useCreateUser();
  const { mutate: updateUser, isLoading: isUpdating, error: updateError } = useUpdateUser();
  const { mutate: deleteUser, isLoading: isDeleting, error: deleteError } = useDeleteUser();
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = (e) => {
    e.preventDefault();
    createUser(newUser);
    setNewUser({ name: '', email: '' });
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser({ id: editUser.id, userData: editUser });
    setEditUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Dashboard</h1>
      <table>
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
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                {deleteError && <p>Error deleting user: {deleteError.message}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <button type="submit" disabled={isCreating}>
          {isCreating ? 'Adding...' : 'Add User'}
        </button>
        {createError && <p>Error adding user: {createError.message}</p>}
      </form>

      {editUser && (
        <form onSubmit={handleUpdateUser}>
          <h2>Edit User</h2>
          <input type="text" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
          <input type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
          <button type="submit" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
          {updateError && <p>Error updating user: {updateError.message}</p>}
        </form>
      )}
    </div>
  );
}

export default Dashboard;