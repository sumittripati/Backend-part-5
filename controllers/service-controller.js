const Service = require("../schema/service-model");
const services = async (req, res) => {
  try {
    const response = await Service.find();
    if(! response) {
        return res.status(404).json({ message: "No services found" });

    }
    res.status(200).json( { msg : response} );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = services;