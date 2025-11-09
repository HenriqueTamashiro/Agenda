const { Sequelize } = require("sequelize");
const config = require("../config/database.js");

const sequelize = new Sequelize(config);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao MariaDB com sucesso!");
  } catch (error) {
    console.error("❌ Erro na conexão:", error);
  } finally {
    await sequelize.close();
  }
})();
