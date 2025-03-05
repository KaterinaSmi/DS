const app = require('./app');
require('dotenv').config();
const config = require('./utils/config');
const logger = require('./utils/logger');
const sequelize = require('./utils/db'); // Import Sequelize instance
const setupAssociations = require('./models');

// Initialize and sync database
const initialize = async () => {
  try {
    await setupAssociations(); // Setup associations
    await sequelize.sync({ force: false }); // Sync all models with the database
    logger.info('Database synced successfully.');
    
    // Start the server after DB is ready
    app.listen(config.PORT, () => {
      logger.info(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error('Error setting up the database:', error);
  }
};

initialize();
