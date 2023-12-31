require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DATABASE_REMOTE
} = process.env;

const sequelize = new Sequelize(`${DATABASE_REMOTE}`, {
  logging: false, // Desactivamos el registro de consultas SQL para no mostrar mensajes innecesarios en la consola.
  native: false, // Desactivamos el uso del cliente nativo de PostgreSQL para evitar posibles errores en algunos entornos.
  dialectOptions:{
    ssl:{
      require:true,
      rejectUnauthorized:false
    }
  }
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))// Leemos el directorio "/models" para obtener los archivos de definición de modelos
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))// Filtramos los archivos para excluir el archivo actual (index.js) y otros archivos no válidos (que no tengan extensión .js)
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file))); // Por cada archivo válido encontrado, lo importamos y lo agregamos al array "modelDefiners"
  });


modelDefiners.forEach(model => model(sequelize));// Llamamos a cada función de modelo presente en el array "modelDefiners" y les pasamos la instancia de Sequelize "sequelize"

let entries = Object.entries(sequelize.models);// Obtenemos las entradas (claves y valores) de los modelos presentes en la instancia de Sequelize "sequelize"
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);// Convertimos las claves (nombres de modelos) a un formato donde la primera letra es mayúscula y el resto es minúscula
sequelize.models = Object.fromEntries(capsEntries);// Convertimos las entradas modificadas nuevamente en un objeto y asignamos este objeto al atributo "models" de la instancia "sequelize

const { User, Sale, Product, Purchase , Category, Favorite, Cart, Review} = sequelize.models;// Obtenemos los modelos de la base de datos (Country y Activity) a través de la instancia de Sequelize "sequelize"

User.hasMany(Product);// hasMany: de uno a muchos
User.hasMany(Sale);

Product.belongsTo(User);// belongsT: de uno a uno
Sale.belongsTo(User);
User.hasMany(Favorite);
Favorite.belongsTo(User);
User.hasMany(Cart);
Cart.belongsTo(User)
Review.belongsTo(User);

Product.belongsToMany(Category, { through: 'Category_Producto' });
Category.belongsToMany(Product, { through: 'Purchase_Producto' });
Cart.belongsToMany(Product, { through: 'Cart_Producto' });
Product.belongsToMany(Cart, { through: 'Cart_Producto' });
Favorite.belongsToMany(Product, { through: 'Favorite_Producto' });
Product.belongsToMany(Favorite, { through: 'Favorite_Producto' });
Review.belongsToMany(Product, { through: 'Review_Producto' });
Product.belongsToMany(Review, { through: 'Review_Producto' });

Purchase.belongsToMany(Product, { through: "Purchase_Producto", timestamps: false });
Product.belongsToMany(Purchase, { through: "Purchase_Producto", timestamps: false });

Purchase.belongsTo(User);
User.hasMany(Purchase);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};