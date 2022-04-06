const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./models');
const Role = db.role;
// var corsOptions = {
//   origin: "http://localhost:3330"
// };
// app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// db.sequelize.sync({force: false}).then(() => {
//     console.log('Drop and resync Db');
//     initial();
// });

// function initial() {
//     Role.create({
//         id: 1,
//         name: 'user'
//     });

//     Role.create({
//         id: 2,
//         name: 'moderator'
//     });

//     Role.create({
//         id: 3,
//         name: 'admin'
//     });
// }

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/type.routes')(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bidate application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 3330;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});