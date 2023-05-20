import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

function Profile() {
    const { user } = useAuth()
    const navigate = useNavigate()

    if (!user)
        return <Navigate to='/login'/>

    return (
        <div>
            <h1>It's {user.username}'s profile</h1>
        </div>
    )
}


export default Profile;