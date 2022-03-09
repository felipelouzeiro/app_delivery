const { sale } = require('../database/models');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`O usuário ${socket.id} acabou de se conectar`);
  socket.on('updateStatus', async ({ saleId, status }) => {
    console.log(`O usuário trocou o status do pedido para: ${status}`);
    await sale.update(
      { status },
      { where: { id: saleId } },
      );

    io.emit('refreshStatus', { saleId, status });
  });
}); 