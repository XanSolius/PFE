import LoginHeader from "../components/LoginHeader";
import "../Components/Login.css";
import LoginLabel from "../components/LoginLabel";
import background from "../assets/background.jpg";
function LoginPage() {
    
  
  return(
    <div style={{backgroundImage: `url(${background})`,
                backgroundRepeat:"no-repeat",
                backgroundSize:"cover",
                height:"100vh",
                width:"100vw"}}>
      <LoginHeader/>            
      <LoginLabel/>
    </div>  
  );
  
}

export default LoginPage ;
