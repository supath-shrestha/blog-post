import { useParams, useNavigate } from "react-router-dom";
import { Container, PostForm, Spinner } from "../components"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditPost = () => {
    const [post, setPost] = useState(null)

    const {slug} = useParams()

    const navigate = useNavigate()

    const posts = useSelector(state => state.post.posts)

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


    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : <Spinner />
}
export default EditPost;