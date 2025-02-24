const adminMiddleware = async (req, res, next) => {
   try {
       console.log(req.user)
       let adminRole = req.user.isAdmin 
       if(!adminRole){
        return res.status(403).json({message: "You are not an admin."})
       }
    //    res.status(200).json({ message: req.user.isAdmin })
    next()
   } catch (error) {
    console.error("Error in admin middleware", error);
    next(error)
   }
}

module.exports = adminMiddleware;