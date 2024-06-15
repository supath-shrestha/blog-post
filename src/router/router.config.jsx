import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { AuthLayout } from '../components/';
import { Home, Login, Signup, AddPost, EditPost, Post, AllPosts } from '../pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />

      <Route path="signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
      <Route path="login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />

      <Route path="add-post" element={<AuthLayout authentication={true}><AddPost /></AuthLayout>} />
      <Route path="all-posts" element={<AuthLayout authentication={true}><AllPosts /></AuthLayout>} />
      <Route path="post/:slug" element={<AuthLayout authentication={true}><Post /></AuthLayout>} />
      <Route path="edit-post/:slug" element={<AuthLayout authentication={true}><EditPost /></AuthLayout>} />
    </Route>
  )
);

export default router;
