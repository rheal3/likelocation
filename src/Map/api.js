import axios from 'axios'

const postLike = async ({title, pageid}) => {
    try {
        return await axios.post("http://localhost:8080/likes", {
            title: title,
            page_id: pageid
        }).catch(err => err)
    } catch (err) {
        return err
    }
}

export default postLike