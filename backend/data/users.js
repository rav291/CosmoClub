import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "ad.min@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Ravi Anand",
    email: "rav291@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "griffin",
    email: "great.griffin@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

export default users;
