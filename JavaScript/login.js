// ================= TOGGLE BETWEEN FORMS =================
function showForm(FormId) {
  document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
  document.getElementById(FormId).classList.add("active");
}

// ================= REGISTER =================
document.querySelector("#register-form form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    Name: form.Name.value,
    rollno: form.rollno.value,
    email: form.email.value,
    password: form.password.value,
    role: form.role.value
  };

  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

    if (result.success) {
      window.location.reload(); // reloads to login form
    }

  } catch (error) {
    console.error("Registration Error:", error);
    alert("⚠️ Server error during registration.");
  }
});

// ================= LOGIN =================
document.querySelector("#login-form form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    rollno: form.rollno.value,
    email: form.email.value,
    password: form.password.value
  };

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log("🔍 Full backend response:", result);
    alert(result.message);

    if (!result.success) return;

    const role = result.role ? result.role.toLowerCase() : null;

    if (!role) {
      alert("⚠️ No role found in backend response. Check backend JSON.");
      return;
    }

    // ✅ Store user info (optional)
    localStorage.setItem("role", role);
    localStorage.setItem("rollno", data.rollno);
    localStorage.setItem("email", data.email);

    // ✅ Redirect based on role
    if (role === "admin") {
      alert("✅ Logged in as Admin!");
      window.location.href = "admin.html";
    } else if (role === "user") {
      alert("✅ Logged in as User!");
      window.location.href = "user.html";
    } else {
      alert(`⚠️ Unknown role received: ${role}`);
    }

  } catch (error) {
    console.error("Login Error:", error);
    alert("⚠️ Server error during login.");
  }
});
