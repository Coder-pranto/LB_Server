const cron = require('node-cron');
const Purchase = require('../models/Purchase');

cron.schedule('0 0 * * *', async () => {
  await Purchase.deleteMany({ expiresAt: { $lt: new Date() } });
  console.log('Expired access tokens cleared');
});
