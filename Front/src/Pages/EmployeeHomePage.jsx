import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/NavbarAdmin";
import backgroundHome from "../assets/backgroundHome.png";
import CurrentDate from "../Components/CurrentDate";


const EmployeeHomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{backgroundImage: `url(${backgroundHome})`,
                    backgroundRepeat:"no-repeat",
                    backgroundPosition: "center",
                    overflow: "hidden",
                    backgroundSize:"cover",
                    height:"100vh",
                    width:"100vw"}}>
        
          <Navbar/>
             
        <h1 style={{color:"black" , marginTop:"220px" , textAlign:"center"}}>Hello there, what are we going to do today ? ^^</h1>  


        <CurrentDate />
             
        <button onClick={() => navigate("/")} style={{marginTop:"20px",
                    padding: "10px 20px",
                    fontSize: "14px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    border: "none",
                    width: "120px",
                    backgroundColor: "#333",
                    color: "white"}}>Disconnect</button>
      
    </div>
  );
};

export default EmployeeHomePage;
