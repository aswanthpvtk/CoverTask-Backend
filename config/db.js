const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://paswanthvtk:sample123@cluster0.nmk47.mongodb.net/NewCover";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected Successfully!");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
});

module.exports = mongoose;
