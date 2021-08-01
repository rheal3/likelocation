import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import logo from '../logo2.png'
import postToLogin from './api'
import { useHistory } from 'react-router-dom';


const SignUpContainer = styled.div`
    background: #afe0bf;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    img {
        margin: 80px 0px 50px 0px;
    }
    input {
        margin: 10px 0px;
        width: 100%
    }
    form {
        background: white;
        width: 400px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 2px 3px 10px 2px rgba(0,0,0,0.47);
    }
`

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    align-items: stretch;
    button {
        flex-grow: 4;
    }
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        text-align: center;
    }
`

const LoginPage = () => {
    const initialState = {email: "", password: ""}
    const [loginState, setLoginValues] = useState(initialState)

    const validEmail = loginState.email.includes('@')
        && loginState.email.length > 3

    const validPassword = loginState.password 
        && loginState.password.length > 0 

    const enableLogin = validPassword
        && validEmail


    const updateLogin = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputVal = target.value;
        const updatedSignup = {...loginState, [inputName]: inputVal }
        setLoginValues(updatedSignup)
    }

    const {email, password} = loginState

    const history = useHistory()
    const submitLogin = () => { 
        postToLogin(loginState).then(res => {
            if (res.data) {
                localStorage.setItem('token', res.data.accessToken)
                history.push('/')
                // TODO get allLikes
            } 
        })
    }

    return (
        <SignUpContainer>
            <img src={logo} alt="like location logo"/>
            <Form onChange={updateLogin}>
                <h1>Login Form</h1>
                <Form.Control type="email" name="email" placeholder='Enter Email' value={email}/>
                <Form.Control type="password" name="password" placeholder='Password' value={password}/>
                <BtnContainer>
                    <Button disabled={!enableLogin} onClick={submitLogin} className="submit">submit</Button>
                    <a href="/signup">signup</a>
                </BtnContainer>
            </Form>
        </SignUpContainer>
    )
}

export default LoginPage