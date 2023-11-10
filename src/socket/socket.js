import chatRouter from "../routers/chatRouter";
import mysql from'mysql2';
import dbconfig from '../database.js';

const connection = mysql.createConnection(dbconfig);


let sql = "INSERT INTO chats (userID, roomID, message, inputTime) VALUES (?, ?, ?, ?)";

module.exports = (io)=>{
    io.on("connection", (socket)=>{
        socket.on("chatting", (data)=>{
            console.log(data);
            connection.query(sql, data, function(err, results, fields) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(results);
                }
            });
        });
        socket.on("disconnect", (data) =>{
            console.log("disconnect");
        })
    })
};