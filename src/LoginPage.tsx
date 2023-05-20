import { FormEvent } from "react";
import { useAuth } from "./Auth";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
    const { login, user } = useAuth()
    const navigate = useNavigate()

    const goHome = () => {
        console.log('redirecting to home')
        navigate('/')
    }

    if (user) {
        return <Navigate to='/' />
    }

    const doLogin = (submitEvent: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(submitEvent.target as HTMLFormElement)

        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        login(username, password)
        goHome();

        submitEvent.preventDefault()
    }

    return (
        <form onSubmit={doLogin}>
            <input type="text" name="username" required/>
            <br />
            <input type="password" name="password" required/>
            <br />
            <button>Login</button>
        </form>
    )   
}

export default LoginPage;