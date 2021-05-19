import {useState} from 'react'

const SignUpPage = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    return (
        <div>
            <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"></input>
            <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"></input>
            <input type="password" name="password2" value={password2} onChange={(e)=>{setPassword2(e.target.value)}} placeholder="Verify Password"></input>
            <button>submit</button>
        </div>
    )
}

export default SignUpPage