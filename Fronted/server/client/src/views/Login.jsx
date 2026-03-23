import { useState } from "react";
import {TextField,Button,Box,FormControlLabel,Checkbox} from "@mui/material";
export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const submit = async () => {
    // ADMIN LOGIN
    if (isAdmin && !isRegister) {
      const res = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/admin/products";
      } else {
        alert("Admin login failed");
      }
      return;
    }
    // REGISTER
    if (isRegister) {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: form.username,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password
        })
      });
      await res.json();
      if (res.status === 409) {
        alert("Email already registered");
        return;
      }
      alert("Account created! Please login.");
      setIsRegister(false);
      return;
    }
    // USER LOGIN
    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password
      })
    });
    const data = await res.json();
    if (data.user_id) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
    } else {
      alert("Wrong username or password");
    }
  };
  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 10, p:3, borderRadius:2, backgroundColor:"rgb(255, 255, 255)",
backdropFilter:"blur(20px)" }}>
      {/* ADMIN TOGGLE */}
      {!isRegister && (
        <FormControlLabel
          control={
            <Checkbox checked={isAdmin}onChange={(e) => setIsAdmin(e.target.checked)}/>}
          label="Login as admin"/>
      )}
      {/* Registreringsformulär */}
      {isRegister && (
        <>
          <TextField fullWidth label="Namn" name="firstName" onChange={handleChange}
          />
          <TextField fullWidth
            sx={{ mt:2 }}
            label="Efternamn" name="lastName" onChange={handleChange}/>
          <TextField fullWidth
            sx={{ mt:2 }} label="Användarnamn" name="username" onChange={handleChange}/>
          <TextField fullWidth
            sx={{ mt:2 }} label="Email" name="email" onChange={handleChange}/>
          <TextField fullWidth
            sx={{ mt:2 }} 
            type="password" label="Lösenord" name="password" onChange={handleChange}/>
        </>
      )}
      {/* ANVÄNDAR LOGIN */}
      {!isRegister && !isAdmin && (
        <>
          <TextField fullWidth label="Användarnamn" name="username" onChange={handleChange}/>
          <TextField fullWidth
            sx={{ mt:2 }}
            type="password" label="Password" name="password" onChange={handleChange}/>
        </>
      )}
      {/* ADMIN LOGIN */}
      {!isRegister && isAdmin && (
        <>
          <TextField fullWidth label="Admin Email" name="email" onChange={handleChange}/>
          <TextField fullWidth
            sx={{ mt:2 }}
            type="password" label="Admin Password" name="password" onChange={handleChange}/>
        </>
      )}
      <Button fullWidth variant="contained"
        sx={{ mt:2 }}
        onClick={submit}>
        {isRegister ? "Register" : "Login"}
      </Button>
      <Button fullWidth
        sx={{ mt:1 }}
        onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Har du redan ett konto? Logga in" : "Create account"}
      </Button>
    </Box>
  );
}