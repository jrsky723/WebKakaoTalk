import "dotenv/config";
import sequelize from "./db";
import app from "./server";
import User from "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

const handleDBConnection = () => console.log("✅ DB Connected. 🚀");

async function startServer() {
  try {
    await sequelize.sync();
    handleDBConnection();
    app.listen(PORT, handleListening);
    // test
    // const user = await User.create({
    //   username: "test",
    //   email: "124@naver.com",
    //   password: "1234",
    // });
    // console.log(user);
  } catch (error) {
    console.log(error);
  }
}

startServer();
