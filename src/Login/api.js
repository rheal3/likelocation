import axios from 'axios'

const postToLogin = async ({email, password}) => {
    try {
        return await axios.post("http://localhost:8080/users/login", {
            email,
            password
        })
    } catch (err) {
        return err
    }
}

export default postToLogin