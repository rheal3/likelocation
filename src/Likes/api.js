import axios from 'axios';

const getLikes = async () => {
    try {
        return await axios.get("http://localhost:8080/likes", {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => {
            return res.data
        })
    } catch (err) {
        return err
    }
}

export default getLikes