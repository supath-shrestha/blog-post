import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { delPost } from "../store/postSlice";
import parse from 'html-react-parser'
import { useEffect, useState } from "react";
import { Spinner, Container, Button } from "../components";
import appwriteService from "../appwrite/service";

const Post = () => {
    const posts = useSelector(state => state.post.posts)

    const [post, setPost] = useState(null)

    const { slug } = useParams();

    const navigate = useNavigate()

    const userData = useSelector(state => state.auth.userData)

    const dispatch = useDispatch()

    const isWriter = post && userData ? (post.userId === userData.$id) : false;


    useEffect(() => {
        if (slug) {
            const searchPost = posts.filter(post => post.$id === slug)
            if (searchPost) {
                setPost(searchPost[0])
            } else {
                navigate('/')
            }
        } else {
            navigate('/')
        }
    }, [slug])

    const deletePost = async () => {
        const response = await appwriteService.deletePost(slug)

        if (response) {
            await appwriteService.deleteFile(post.featuredImage)
            dispatch(delPost(slug))
            navigate('/')
        }

    }


    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isWriter && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : <Spinner />;
}
export default Post