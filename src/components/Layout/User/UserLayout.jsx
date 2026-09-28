import { Outlet } from "react-router";
import UserSidebar from "./Sidebar";
import UserNavbar from "./Navbar";
export default function UserLayout(){
    return(
        <div className="flex  h-screen">
          
              <UserSidebar/>
            <div className="flex-1 flex flex-col">
                <UserNavbar/>
                <div className="flex-1 overflow-auto">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}