import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector(state => state.auth.status)

  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true,
    },
    {
      name: 'SignUp',
      path: '/signup',
      active: !authStatus,
    },
    {
      name: 'Login',
      path: '/login',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      path: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      path: '/add-post',
      active: authStatus,
    },
  ]
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex items-center ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
