import Profile from "../../components/UserProfile/Profile";
import { useParams } from "react-router";
export default function UserProfilePage(){
    const {id}=useParams()
    return <Profile userid={id} isownprofile={false}/>
}