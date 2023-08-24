const {Review, Product} = require("../db")

const createRev = async (id, UserId, review, rating, comment) => {
  try {
    if (id) {
      const newProductReview = await Review.create({
        UserId,
        rating,    
        comment    
      });
      await newProductReview.setProducts(id);
      return newProductReview;
    }

    const newReview = await Review.create({
      UserId,
      rating,    
      comment    
    });

    review.forEach(async (producto) => {
      await newReview.setProducts(producto.id);
    });

    return newReview;
  } catch (error) {
    return error;
  }
};


  const delRev = async (idProduct, UserId) => {
    try {
      let foundRev = await Review.findOne({
        where: {
          UserId: UserId,//modelo Review UserId === UserId
        },
        include: {
          model: Product,
          where: {
            id: idProduct,
          },
        },
      });
      if (foundRev) {
        await foundRev.destroy()
        return "eliminao";
      } else {
        throw new Error("no eliminao");
      }
    } catch (error) {
      return error;
    }
  };
  

const getRev = async ()=>{
    try {
        const productosEnReview = await Review.findAll({
          include:{
            model: Product,
            attributes:["id","image"]
          }
        });
        return productosEnReview;
      } catch (error) {
        console.error("Error al obtener los Productos del Review:", error);
        return null;
      }
  }

module.exports = {createRev,delRev,getRev};