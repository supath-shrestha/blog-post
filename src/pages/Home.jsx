import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";

const Home = () => {
  const posts = useSelector(state => state.post.posts)

  const authStatus = useSelector(state => state.auth.status)

  // console.log(posts)

  return authStatus ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>)
          )}
        </div>
      </Container>
    </div>)
    : (<div className="text-center text-xl">Login to view, add, edit, and delete posts</div>)

};
export default Home;
