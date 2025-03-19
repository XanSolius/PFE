import Navbar from "../Components/Navbar/NavbarAdmin";
import UserManagementH from "../Components/Users/HeaderUserManagement";
import UserTable from "../Components/Users/UserTable"

function UserManagementPage(){
    return(
        <>
            <Navbar />          
            <UserManagementH/>
            <UserTable/>
        </>
    );
}

export default UserManagementPage;