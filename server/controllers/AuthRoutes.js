import User from '../models/User.js';
import Store from '../models/Store.js';

const maxAge = 3 * 24 * 60 * 60;
const createToken = (email,userId) => {
    return jwt.sign({email,userId}, process.env.JWT_KEY,{expiresIn:maxAge});
}


/*
Signup karte hue we will recieve the role as well from the frontend. Also, if by chance
role is that of an admin or cashier than we need to have a store id specific to that store where admin
or cashier is working at the moment.

*/

export const signup = async(req, res, next) => {
    try{
        const {name, email, password, phone} = req.body;
        const {role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).send("All fields are required");
        }
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).send("User already exists");
        }
        //For admin and cashier we need to set its store.
        const user = null;
        if(role === "admin" || role === "cashier"){
            const {storeId} = req.body;
            if(!storeId){
                return res.status(400).send("All fields are required");
            }
            const store = await Store.findById(storeId);
            if(!store){
                return res.status(404).send("Store doesnot exist");
            }
            user = new User({
                name,
                email,
                phone,
                role,
                password,
                storeId
            });
            await user.save();
        }
        else{
            //For a normal user, we are not setting its store.
            user = new User({
                name,
                email,
                phone,
                role,
                password,
            });
            await user.save();
            
        }
        return res.cookie("jwt",createToken(email,user.id),{maxAge,secure:false}).status(201).json({user:{
            id:user.id,
            email:user.email,
            name:user.name,
        }})
    }catch(error){
        console.log(error);
        return res.status(500).send("Internal Server error");

    }
}


/*Dekho agar toh login karte hue user mai if store is available, then in that case
tum user ko storeId pass kar do and using a useEffect get the details of store.(Only cashier and admin(not superadmin) has a store)


*/

export const login = async(req, res, next) => {
     try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send("All fields are required");
        }
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).send("User doesnot exists");
        }

        const authPassword = await compare(password, existingUser.password);

        if(!authPassword){
            return res.status(400).send("Invalid password");
        }

        return res.cookie("jwt",createToken(email,existingUser.id),{maxAge,secure:false}).status(200).json({user:{
            id:existingUser.id,
            email:existingUser.email,
            role:existingUser.role,
            storeId:existingUser.store ? existingUser.store : null,

        }});
    }catch(error){
        console.log(error);
        return res.status(500).send("Internal Server error");

    }
}