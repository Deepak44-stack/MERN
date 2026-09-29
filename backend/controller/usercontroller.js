import User from "../model/user.js";
import createToken from "../utils/createtoken.js";

const signup = async (req, res) => {

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) return res.status(400).send({ error: "user already exist" });

    const newUser = await User.create({ name, email, password });

    res.send({

        message: "user Created",

        user: {

            name: newUser.name,

            email: newUser.email,

            isAdmin: newUser.isAdmin,

        },

    });

};

const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).send({ error: "User not registered " });

    if (await user.comparePassword(password)) {
        createToken(user._id,res);
        res.send({

            message: " login successful ",

            user: {

                name: user.name,

                email: user.email,

                isAdmin: user.isAdmin,

            },

        });

    } else {

        res.status(400).send({ error: "password not matched" });

    }

    

};
    const logout = async (req,res) =>
    {
         res.clearCookie("jwt");
         res.send({
            message : "logout successful",
         });


    };


export { signup,login,logout };
