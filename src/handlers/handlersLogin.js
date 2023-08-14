const createToken  = require("../controllers/controllerLogin")

const checkLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(password)
        const newToken = await createToken(email, password);


        if (newToken) {
            res.status(200).json({ newToken });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = checkLogin;