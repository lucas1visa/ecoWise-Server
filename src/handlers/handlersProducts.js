const { async } = require("rxjs")
const { products, crearProducts, updateProducts, deletP, searchProductByName, searchProductById, searchProductByCategory, crearProductsAdmin } = require("../controllers/controllerProduct")


const getProducts = async (req, res) => {
    const {name}= req.query;
    console.log(name)
    try {
    if(name){
        const ProductName= await searchProductByName(name)
       return res.status(200).send(ProductName);
    }
        const todosLosProductos = await products()
        res.status(200).send(todosLosProductos)
    } catch (error) {
        res.status(500).send(error)
    }
}

const postProductAdmin = async (req, res) => {
    const productData = req.body; // El cuerpo de la solicitud es un objeto con los datos del producto
    try {
        await crearProductsAdmin(
            productData.name,
            productData.description,
            productData.price,
            productData.quantityAvailable,
            productData.category,
            productData.image
        );
        res.status(200).send("Se registró correctamente el producto.");
    } catch (error) {
        console.error("Error al registrar producto:", error);
        res.status(500).send("Error al registrar producto: " + error.message);
    }
};




const postProducts = async (req, res) => {
    const productsArray = req.body; // El cuerpo de la solicitud debe ser un arreglo de objetos
    try {
        // Iterar sobre el arreglo de productos y registrar cada uno utilizando crearProducts
        for (const productData of productsArray) {
            await crearProducts(
                productData.name,
                productData.description,
                productData.price,
                productData.quantityAvailable,
                productData.category,
                productData.image
            );
        }
        res.status(200).send("Se registraron correctamente los productos.");
    } catch (error) {
        console.error("Error al registrar productos:", error);
        res.status(500).send("Error al registrar productos: " + error.message);
    }
};

const putProducts = async (req, res) => {
    const { price, quantityAvailable, id } = req.body;
    const updateProductos = await updateProducts(id, price, quantityAvailable)

    try {
        res.status(200).send("Producto actualizado correctamente")

    } catch (error) {
        res.status(500).send("Hubo un error al actualizar el producto")
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const deleteProducto = await deletP(id)
    try {
        res.status(200).send('Producto borrado con exito')
    } catch (error) {
        res.status(500).send('Error: ' + error.message)
    }
}
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const results = id ? await searchProductById(id) : await getProducts();

        res.status(200).json(results);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        const resultado = category ? await searchProductByCategory(category) : await getProducts();

        res.status(200).json(resultado);


    } catch (error) {
        res.status(400).json({ error: error.message });

    }
}

module.exports = {
    getProducts,
    postProducts,
    putProducts,
    deleteProduct,
    getProductById,
    getProductByCategory,
    postProductAdmin
}