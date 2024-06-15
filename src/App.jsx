import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/service";
import { setLogin, setLogout } from "./store/authSlice";
import { setPosts } from "./store/postSlice";
import { Header, Footer, Spinner } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await authService.getLoggedInUser()

        if (userData) {
          dispatch(setLogin(userData))

          const response = await appwriteService.getAllPosts()

          if (response) {
            dispatch(setPosts(response.documents))
          }
        } else {
          dispatch(setLogout())
        }
      } catch (error) {
        console.log(`Error while getting logged in user info or documents ${error}`)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, []);

  return !loading ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (<Spinner />)
}

export default App;
