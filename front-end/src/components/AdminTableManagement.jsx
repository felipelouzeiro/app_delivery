import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/slices/userSlice';
import { deleteUser } from '../api';

function AdminTableManagement() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const renderRole = (role) => {
    if (role === 'customer') return 'Cliente';
    if (role === 'seller') return 'P. Vendedora';
    return 'Admin';
  };

  const removeUserById = (id) => {
    dispatch(removeUser(id));
    deleteUser(id);
  };

  return (
    <div className="users-table">
      { console.log(users) }
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { users.map(({ id, name, email, role }, index) => (
            <tr key={ index }>
              <td
                className="table-user-id"
                data-testid={ `admin_manage__element-user-table-item-number-${id}` }
              >
                { index + 1 }
              </td>
              <td
                className="table-user-name"
                data-testid={ `admin_manage__element-user-table-name-${id}` }
              >
                { name }
              </td>
              <td
                className="table-user-email"
                data-testid={ `admin_manage__element-user-table-email-${id}` }
              >
                { email }
              </td>
              <td
                className="table-user-role"
                data-testid={ `admin_manage__element-user-table-role-${id}` }
              >
                { renderRole(role) }
              </td>
              <td>
                <button
                  className="table-user-remove "
                  type="button"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  onClick={ () => removeUserById(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTableManagement;
