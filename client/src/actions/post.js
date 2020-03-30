import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST
} from './types';

//Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            error:{msg: err.response.statusText, status:err.response.status }
        })
    }
}

//Add like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{ postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            error:{msg: err.response.statusText, status:err.response.status }
        })
    }
}
//remove like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{ postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            error:{msg: err.response.statusText, status:err.response.status }
        })
    }
}
//remove like
export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${id}`)
        dispatch({
            type:DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post removed', 'success'))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            error:{msg: err.response.statusText, status:err.response.status }
        })
    }
}
