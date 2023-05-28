const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const authRouter = require('./Routers/authRouter')
const vacancyRouter = require('./Routers/vacancyRouter')

const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // Укажите здесь домен, с которого вы хотите разрешить запросы
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP методы, которые вы хотите разрешить
    credentials: true, // Разрешить кросс-доменные cookies
}));

app.use(express.json());
app.use("/auth", authRouter)
app.use("/vacancy", vacancyRouter)
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