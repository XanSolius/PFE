//import login from "./login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginLabel(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token); // Save token
                localStorage.setItem("role", data.role);   // Save role
                console.log("User role:", data.role); // Debugging
                // Redirect based on role
                if (data.role === "admin") {
                    navigate("/HomePageAdmin"); // Redirect to Admin Page
                } else {
                    navigate("/EmployeeHomePage"); // Redirect to User Dashboard
                }
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Server is not responding ❌");
        }
    };

    return(
       <>
       <label className="LoginCountainer">
        <h4 style={{color:'black'}}>Welcome Back!</h4>
        <div className="Input">
            <label>Email</label>    
            <input style={{color:'black'}} type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="loginpass"/>
            <label>Password</label>
            <input style={{color:'black'}} type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="loginpass" /> 
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
        <div className="ForgotPass"><a href ="#">Forgot Password ?</a></div>
        </label> 
        
       </>
    );
}

export default LoginLabel;