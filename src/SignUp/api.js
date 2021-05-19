import axios from 'axios'

const postToSignup = async ({email, password}) => {
    try {
        return await axios.post("http://localhost:8080/users/signup", {
            email,
            password
        })
    } catch (err) {
        return err
    }
}

export default postToSignup