const initState = {
    likes: [],
    isLoading: false
}

const likesReducer = (state = initState, {type, payload}) => {
    switch (type) {
        case 'likes/locationSelected': {
            const currentLikes = state.likes
            return {
                ...state,
                isLoading: false,
                likes: [...currentLikes, payload]
            }
        }
        case 'likes/locationRemoved': {
            const allLikes = state.likes
            const allLikesRemoved = allLikes.filter(location => location.pageid !== payload)
            return {likes: allLikesRemoved}
        }
        case 'likes/loading':
            return {
                ...state,
                isLoading: true
            }
        default :
            return state
    }
}

export default likesReducer