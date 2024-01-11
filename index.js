const mongoose = require("mongoose");

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/inscription");
        console.log("connexion réussie avec la BDD")
    } catch (error) {
        console.log(error.message);
    }
})();