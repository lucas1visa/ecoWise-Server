const {getcarrito,crearCart,updateCarrito, deletCart}=require("../controllers/controllersCart")
    const getCart = async (req, res) => {
        try {
            const Carito = await getcarrito()
            res.status(200).send(Carito)
        } catch (error) {
            res.status(500).send(error)
        }
    }



    const postCart = async (req, res) => {
        const { id,UserId,carrito } = req.body
        try {
            const crearCarrito = await crearCart(id,UserId,carrito)
            res.status(200).send("Carrito creado Correctamente")
        } catch (error) {
            res.status(500).send("Error: " + error.message)
        }
    }
    const putCart = async (req, res) => {
        const { quantityAvailable, id } = req.body;
        const updateCart = await updateCarrito(id, quantityAvailable)
        try {
            res.status(200).send("Carrito actualizado correctamente");
        } catch (error) {
            res.status(500).send("Hubo un error");
        }
    };

    const deleteProdCart = async (req, res) => {
        let {id,UserId} = req.body;

        const deleteProdCarrito = await deletCart(id,UserId);
        try {
            res.status(200).send(`Se elimino el producto con id: ${id} con exito`)
        } catch (error) {
            res.status(500).send('Ocurrio un error al querer eliminar el producto del carrito')
        }
    }

    module.exports = { putCart,postCart,getCart, deleteProdCart}