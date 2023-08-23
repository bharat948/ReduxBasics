import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { selectPostById, } from "./postsSlice";
import PostAuthor from "./PostAuthor";

import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const SinglePostPage=()=>{
const {postId}= useParams();


    const post =useSelector((state)=>selectPostById(state,Number(postId)))
     if(!post){
        return (
            <section>
                <h2>
                    page not Found!
                </h2>
            </section>
        )
     }
     return (
        <article>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={ post }/>
    </article>
     )
}

export default SinglePostPage