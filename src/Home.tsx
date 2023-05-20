import { useAuth } from './Auth'

function Home() {
    const { user } = useAuth()

    if (user) {
        return (
            <div>
                <h1>Welcome {user.username}!!</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Home page</h1>
        </div>
    )
}

export default Home