const fs = require("fs");
// Get All random user
module.exports.getAllUser = (req, res) => {
  const users = JSON.parse(fs.readFileSync("./data/users.json"));
  const limit = req.query.limit ? parseInt(req.query.limit) : users.length;
  res.json(users.slice(0, limit));
};
// Get A random user
module.exports.getARandomUser = (req, res) => {
  const users = JSON.parse(fs.readFileSync("./data/users.json"));
  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomIndex];
  res.json(randomUser);
};

// POST - Save a  user
module.exports.saveARandomUser = (req, res) => {
  const users = JSON.parse(fs.readFileSync("./data/users.json"));
  const newUser = req.body;
  if (
    !newUser ||
    !newUser.gender ||
    !newUser.name ||
    !newUser.contact ||
    !newUser.address ||
    !newUser.photoUrl
  ) {
    return res.status(400).json({ error: "Missing required properties" });
  }
  users.push({ id: (users.length + 1).toString(), ...newUser });
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
  res.json(newUser);
};

// Patch - update a  user by id
module.exports.UpdateARandomUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const usersData = JSON.parse(fs.readFileSync("./data/users.json"));

    const userIndex = usersData.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    usersData[userIndex] = { ...usersData[userIndex], ...updatedUser };

    fs.writeFileSync("./data/users.json", JSON.stringify(usersData, null, 2));

    res.json(usersData[userIndex]);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Patch - bulk update some users by ids array
module.exports.BulkUpdateRandomUser = (req, res) => {
  const { userIds, updatedUser } = req.body;

  if (!Array.isArray(userIds)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const users = JSON.parse(fs.readFileSync("./data/users.json"));
  const updatedUsers = [];

  for (const userId of userIds) {
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      updatedUsers.push(users[userIndex]);
    }
  }

  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
  res.json(updatedUsers);
};

// Delete - delete user by id
module.exports.deleteUserById = (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  const users = JSON.parse(fs.readFileSync("./data/users.json"));
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(userIndex, 1);
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
  res.json({ message: "User deleted successfully" });
};
