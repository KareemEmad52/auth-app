import mongoose from "mongoose";

export const DBConnection = () => {
    mongoose.connect(process.env.DBConnection)
    .then(() => console.log("DB Connected successfully...."))
    .catch ((error) => {
        console.log({ message: "DB Faild to connect", error });
    })
}