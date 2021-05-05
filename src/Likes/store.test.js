import likesReducer from './store'

describe('likesReducer', () => {
    describe('likes/locationSelection action', () => {
        test('should add like to likes array', () => {
            const currentState = {
                likes: [],
                isLoading: false
            }
            const selectedLike = {title: 'whatever', pageid: 1234}
            const locationSelectedAction = {type: 'likes/locationSelected', payload: selectedLike}

            const stateWithSelectedLike = likesReducer(currentState, locationSelectedAction)

            expect(stateWithSelectedLike.likes).toStrictEqual([selectedLike])
        })

        test('should change isLoading state to false', () => {
            const currentState = {
                likes: [],
                isLoading: true
            }
            const selectedLike = {title: 'whatever', pageid: 1234}
            const locationSelectedAction = {type: 'likes/locationSelected', payload: selectedLike}

            const stateWithSelectedLike = likesReducer(currentState, locationSelectedAction)

            expect(stateWithSelectedLike.isLoading).toBe(false)
        })
    })

    test('should remove like from likes array when given a likes/locationRemoved action', () => {
        const currentState = {
            likes: [{title: 'whatever', pageid: 1234}, {title: 'huzzah', pageid: 4321}],
            isLoading: true
        }
        const removeLike = {pageid: 4321}
        const locationRemovedAction = {type: 'likes/locationRemoved', payload: removeLike}

        const stateWithRemovedLike = likesReducer(currentState, locationRemovedAction)

        expect(stateWithRemovedLike.likes).not.toContain(removeLike)
    })
})