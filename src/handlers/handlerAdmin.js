const jwt = require("jsonwebtoken")
const { KEYWORD_JWT } = process.env;

const handlerAdmin = (req,res) =>{
    // try {
    //     if (req.userData && req.userData.isAdmin) {
    //         res.status(200).json({ userid: req.userData.id , Admin:true});
    //     } else {
    //         res.status(403).json({ msg: "Access denied" }); // Devuelve un error 403 Forbidden si el usuario no es un administrador
    //     }
    // } catch (error) {
    //     res.status(400).json({error:error.message});
    // }
    try {
        const info = req.body.token;
        let infostring = info.toString();
        const decoded = jwt.verify(infostring, KEYWORD_JWT);
        // console.log(info)
        res.status(200).send(decoded)
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports = handlerAdmin;