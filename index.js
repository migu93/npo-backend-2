const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const authRouter = require('./authRouter')
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter)
const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://migu93:EneOEztnO334d@cluster0.hgueytq.mongodb.net/npo-backend?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}
start()