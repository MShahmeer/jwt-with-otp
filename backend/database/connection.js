import mongoose from "mongoose";

async function connect() {
  mongoose.set("strictQuery", true);
  const db = await mongoose
    .connect("mongodb://localhost:27017/jwtwithotp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connection successfull...."))
    .catch((error) => console.log(error));

  return db;
}

export default connect;
