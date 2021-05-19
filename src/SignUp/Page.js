import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import logo from '../logo2.png'
import postToSignup from './api'

const SignUpContainer = styled.div`
    background: #afe0bf;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        margin-bottom: 50px;
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

const SignUpPage = () => {
    const initialState = {email: "", password: "", password2: ""}
    const [signupState, setSignupValues] = useState(initialState)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    
    const validEmail = signupState.email.includes('@')
    && signupState.email.length > 3

    const validPassword = passwordsMatch 
        && signupState.password 
        && signupState.password.length > 0 
        && signupState.password2.length > 0
    
    const enableSignup = validPassword
        && validEmail

    const updateSignup = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputVal = target.value;
        const updatedSignup = {...signupState, [inputName]: inputVal }
        setSignupValues(updatedSignup)
    }

    const {email, password, password2} = signupState

    const submitSignup = () => { 
        postToSignup(signupState).then(setSignupValues(initialState))
    }

    const checkPasswordsMatch = (event) => {
        if (signupState.password === event.target.value) {
            setPasswordsMatch(true)
        } else {
            setPasswordsMatch(false)
        }
    }

    return (
        <SignUpContainer>
            <img src={logo} alt="like location logo"/>
            <Form onChange={updateSignup}>
                <Form.Control type="email" name="email" placeholder='Enter Email' value={email}/>
                <Form.Control type="password" name="password" placeholder='Password' value={password}/>
                <Form.Control type="password" name="password2" placeholder='Verify Password' value={password2} onChange={checkPasswordsMatch}/>
                <Button disabled={!enableSignup} onClick={submitSignup}>submit</Button>
            </Form>
        </SignUpContainer>
    )
}

export default SignUpPage