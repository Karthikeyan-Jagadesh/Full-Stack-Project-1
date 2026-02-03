// ==================== server.js ====================
const express = require("express");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


oracledb.initOracleClient({ libDir: "C:\\instantclient_23_9" });


const dbConfig = {
  user: "karthi2",                   
  password: "password1",             
  connectString: "localhost:1521/XE"  
};

// ==================== REGISTER ====================
app.post("/register", async (req, res) => {
  const { Name, rollno, email, password, role } = req.body;

  try {
    const conn = await oracledb.getConnection(dbConfig);

    await conn.execute(
      `INSERT INTO USERS (NAME, RNO, EMAIL, PASSWORD, ROLE)
       VALUES (:name, :rno, :email, :password, :role)`,
      { name: Name, rno: rollno, email, password, role },
      { autoCommit: true }
    );

    await conn.close();
    res.json({ success: true, message: "✅ Registration successful!" });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: "❌ Registration failed!" });
  }
});

// ==================== LOGIN ====================
app.post("/login", async (req, res) => {
  const { rollno, email, password } = req.body;

  try {
    const conn = await oracledb.getConnection(dbConfig);

    const result = await conn.execute(
      `SELECT NAME, ROLE FROM USERS
       WHERE RNO = :rno AND EMAIL = :email AND PASSWORD = :password`,
      { rno: rollno, email, password }
    );

    await conn.close();

    if (result.rows.length > 0) {
      const [name, role] = result.rows[0];
      res.json({
        success: true,
        message: `✅ Welcome ${name}! You are logged in as ${role}.`,
        role: role.toLowerCase() 
      });
    } else {
      res.json({ success: false, message: "❌ Invalid credentials!" });
    }

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "❌ Login failed!" });
  }
});

// ==================== START SERVER ====================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
