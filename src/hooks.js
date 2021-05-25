import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

export const useRequireLogin = () => {
    const history = useHistory()
    useEffect(() => {
        const isValidToken = localStorage.token && localStorage.token.trim().length > 0
        if (!isValidToken) {
            history.push('/login')
        }
    })
}

