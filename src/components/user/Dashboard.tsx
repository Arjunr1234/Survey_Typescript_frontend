import { useEffect } from 'react'
import Header from './Header'
import { useAuth } from '../../contexts/AuthContext'

function Dashboard() {
  const {isUserLoggedIn} = useAuth()

  useEffect(() => {
      console.log("is user loggedIN: ", isUserLoggedIn)
  },[])
  return (
    <>
     <div className="h-screen flex flex-col">
      <Header/>
     <main className="flex-1 flex justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to My Survey</h1>
    </main>
</div>


    </>
  )
}

export default Dashboard
