const { sale } = require('../database/models');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`o usuário ${socket.id} acabou de se conectar`);
  socket.on('updateStatus', async ({ saleId, status }) => {
    console.log(`Vendedor trocou o status do pedido para: ${status}`);
    await sale.update(
      { status },
      { where: { id: saleId } },
      );

    io.emit('refreshStatus', { saleId, status });
  });
}); 