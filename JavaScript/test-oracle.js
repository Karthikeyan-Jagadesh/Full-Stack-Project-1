const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: 'C:\\instantclient_23_9' });


async function run() {
  try {
    let connection = await oracledb.getConnection({
      user: "karthi2",
      password: "password1",
      connectString: "localhost/XE"  // or XEPDB1 if using pluggable DB
    });

    console.log("✅ Connected to Oracle DB");

    let result = await connection.execute("SELECT 'Hello from Oracle!' FROM dual");
    console.log(result.rows);

    await connection.close();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

// Call the function
run();
