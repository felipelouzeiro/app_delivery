// import React, { useEffect, useState } from 'react';
// import { getUsers } from '../api/index';

// function AdminTableManagement() {
//   const [allUsers, setAllUsers] = useState([]);

//   useEffect(() => {
//     const users = getUsers();
//     setAllUsers(users);
//   });

//   return (
//     <>
//     { allUsers.map(({ id, name, email, role }, index) => (
//       <div>
//         <ul>
//           <li key={ index }>
//             <h3
//               data-testid={ `admin_manage__element-user-table-item-number-${id}` }
//             >
//               { index + 1 }
//             </h3>
//             <h3
//               data-testid={ `admin_manage__element-user-table-name-${id}` }
//             >
//               { name }
//             </h3>
//             <h3
//               data-testid={ `admin_manage__element-user-table-email-${id}` }
//             >
//               { email }
//             </h3>
//             <h3
//               data-testid={ `admin_manage__element-user-table-role-${id}` }
//             >
//               { role }
//             </h3>
//             <button
//               onClick={}
//               type="button"
//               data-testid={ `admin_manage__element-user-table-remove-${id}` }
//             >
//               Excluir
//             </button>
//           </li>
//         </ul>
//       </div>
//     ))}
//     </>
//   );
// }

// export default AdminTableManagement;
