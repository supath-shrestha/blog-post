import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },

        setPost: (state, action) => {
            state.posts.push(action.payload);
        },

        updatePost: (state, action) => {
            // state.posts = state.posts.filter(post => post.$id !== action.payload.$id)
            // state.posts.push(action.payload)

            //to update and place post in same order of createdAt
            state.posts.forEach((post, idx, arr) => {
                if (post.$id === action.payload.$id) {
                    arr[idx] = {
                        ...action.payload
                    }
                }
            })
        },

        delPost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload)
        }
    },
})

export const { setPosts, setPost, delPost, updatePost } = postSlice.actions;

export default postSlice.reducer