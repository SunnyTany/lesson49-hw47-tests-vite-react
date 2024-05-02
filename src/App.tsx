import { useEffect, useState } from "react"
import './App.css'

interface UserInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

function App() {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data: UserInterface[] = await response.json()
        setUsers(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {isLoading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && users.length > 0 && 
        (users?.map(user => (
          <div key={user.id}>
            <hr/>
          <h2>{user.id}. {user.name}: </h2>
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>
        </div>
        )))
      }
    </>
  )
}

export default App