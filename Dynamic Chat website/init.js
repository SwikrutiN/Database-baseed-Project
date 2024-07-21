const mongoose = require("mongoose");

const Chat = require("./models/chat.js");

main()
    .then(() => {
        console.log("Connection Successful.");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let allChats = [
//     {
//         from: "adam",
//         to: "eve",
//         msg: "Send me notes",
//         created_at: new Date(),
//     },
//     {
//         from: "prisha",
//         to: "kriday",
//         msg: "Hello, Kridu",
//         created_at: new Date(),
//     },
//     {
//         from: "Sanket",
//         to: "Sejal",
//         msg: "Hello, Deju",
//         created_at: new Date(),
//     },
//     {
//         from: "Trisha",
//         to: "prisha",
//         msg: "Hii beauty",
//         created_at: new Date(),
//     },
//     {
//         from: "watson",
//         to: "donald",
//         msg: "Hiii, trump",
//         created_at: new Date(),
//     }
// ]

// Chat.insertMany(allChats);