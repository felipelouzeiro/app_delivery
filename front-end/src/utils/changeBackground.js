export default (status) => {
  switch (status) {
  case 'Pendente':
    return '#D4C63B';
  case 'Preparando':
    return '#87D53C';
  case 'Em Trânsito':
    return '#421981';
  case 'Entrege':
    return '#3BD5B0';
  default:
    break;
  }
};
