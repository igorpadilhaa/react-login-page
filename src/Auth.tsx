import { createContext, useContext, useState, ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface UserData {
    username: string
}

interface AuthContext {
    user: UserData | null,
    login: (username: string, password: string) => void,
    logout: () => void
}

const authContext = createContext<AuthContext | null>(null)

function userFromStorage() {
    const userData = localStorage.getItem('user');
    
    if (!userData)
        return null;
    
    return JSON.parse(userData) as UserData;
}


function AuthProvider(props: { children: ReactNode | ReactNode[] }) {
    const [ user, setUser ] = useState(userFromStorage)

    const login = (username: string, password: string) => {
        console.log(`loging with username ${username} and password ${password}`)
        setUser({ username })
        localStorage.setItem('user', JSON.stringify({ username }))
    }

    const logout = () => {
        if (!user) {
            console.error('fail to logout, user is currently null (not logged)')
            return;
        }

        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <authContext.Provider value={{ user: user, login, logout }}>
            {props.children}
        </authContext.Provider>
    )
}

function useAuth() {
    return useContext(authContext) as AuthContext
}

function ProtectedRoute(props: { children: ReactNode }) {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to='/login'/>
    }

    console.log(`entering profile of ${user.username}`)

    return <>{props.children}</>
}

export {
    useAuth,
    AuthProvider,
    ProtectedRoute
}