import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminTableManagement from '../components/AdminTableManagement';
import AdminForm from '../components/AdminForm';
import CustomerNavBar from '../components/CustomerNavbar';
import { getUsers } from '../api';
import { saveUsers } from '../redux/slices/userSlice';

function AdminTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers()
      .then((response) => (dispatch(saveUsers(response.data))));
  });

  return (
    <div>
      <CustomerNavBar />
      <h1>Cadastrar Novo Usuário</h1>
      <AdminForm />
      <AdminTableManagement />
    </div>
  );
}

export default AdminTable;
