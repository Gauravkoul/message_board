import "dotenv/config";

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const connect = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default connect;
