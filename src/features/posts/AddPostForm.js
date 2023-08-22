import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";
import { addNewPost} from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
const AddPostForm = () => {
    const Dispatch = useDispatch()
    const [title, setTitle] = useState('')

    const [userId, setuserId] = useState('')
    const [content, setContent] = useState('')
    const [addRequestStatus,setAddRequestStatus]=useState('idle');


    const users = useSelector(selectAllUsers)



    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setuserId(e.target.value)
    const canSave=[title,content,userId].every(Boolean)&&addRequestStatus==='idle';

    const onsavePostclicked = () => {
     if(canSave)
     {
        try{
            setAddRequestStatus('pending')
            Dispatch(addNewPost({title,body:content,userId})).unwrap();
            setTitle('')
            setContent('')
            setuserId('')

        }catch(err)
        {
            console.error('failed to save the post',err)

        }finally{
            setAddRequestStatus('idle');
        }
     }
    }

    const usersOption = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}

        </option>
    ))

    return (
        <section>
            <h2>
                Add a New Post
            </h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""> </option>
                    {usersOption}
   
                </select>


                <label htmlFor="postContent">
                    Content:
                </label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button"
                    on onClick={onsavePostclicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm