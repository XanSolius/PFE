//import login from "./login";
import { useNavigate } from "react-router-dom";
import LoginActor from "./LoginActors";
function LoginLabel(){
    const navigate = useNavigate();
    return(
       <>
       <label className="LoginCountainer">
        <div className="choicebox">
            <p>Select your role please :</p>
            <LoginActor/>
        </div>
        <div className="Input">
            <label>Email</label>    
            <input type="email" id="email" name="email" className="loginpass"/>
            <label>Password</label>
            <input type="password" id="password" name="password" className="loginpass" /> 
        </div>
        <div>
            <button onClick={() => navigate("/HomePageAdmin")}>Login</button>
        </div>
        <div className="ForgotPass"><a href ="#">Forgot Password ?</a></div>
        </label> 
       </>
    );
}

export default LoginLabel;