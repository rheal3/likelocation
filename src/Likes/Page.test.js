import * as redux from "react-redux";
import {render} from "@testing-library/react";
import LikesPage from "./Page";

jest.mock('react-router-dom', () => {
    return {
        Link: function({ children }) {
            return <div className='link'>{children}</div>
        }
    }
})

describe('LikesPage', () => {
    test('empty state should show when likes are empty', () => {
        const useDispatchSpy = jest.spyOn(redux, "useDispatch")
        const mockUseDispatch = jest.fn()
        useDispatchSpy.mockImplementation(mockUseDispatch)
        const useSelectorSpy = jest.spyOn(redux, "useSelector")
        const mockUseSelector = jest.fn().mockReturnValue([])
        useSelectorSpy.mockImplementation(mockUseSelector)

        render(<LikesPage/>);

        const heading = document.getElementById('liked-locations-heading')
        const emptySubHeading = document.getElementById('empty-liked-locations-subheading')

        expect(mockUseSelector).toBeCalledTimes(1)
        expect(heading.textContent).toBe('Liked Locations')
        expect(emptySubHeading.textContent).toBe("you don't have any likes :(")
    })

    test('state with likes should show liked item on screen', () => {
        const useDispatchSpy = jest.spyOn(redux, "useDispatch")
        const mockUseDispatch = jest.fn()
        useDispatchSpy.mockImplementation(mockUseDispatch)
        const useSelectorSpy = jest.spyOn(redux, "useSelector")
        const mockUseSelector = jest.fn().mockReturnValue([{title: "Airlie Beach, Queensland", pageid: "1589715"}, {title: "Riordanvale, Queensland", pageid: "56242997"}])
        useSelectorSpy.mockImplementation(mockUseSelector)

        render(<LikesPage/>);

        const heading = document.getElementById('liked-locations-heading')
        const airlieInfo = document.getElementById("1589715")
        const riordanvaleInfo = document.getElementById("56242997")
        
        expect(mockUseSelector).toBeCalledTimes(1)
        expect(heading.textContent).toBe('Liked Locations')
        expect(airlieInfo.textContent).toBe("Airlie Beach, Queensland")
        expect(riordanvaleInfo.textContent).toBe("Riordanvale, Queensland")
    })
})

















// test('higher order functions (HoF)', () => {
//
//     // Definition a HoF is any function, that takes a function as parameter or returns a function
//
//     const thunk = (param1, param2) => {
//         return (dispatch) => {
//             dispatch(param1, param2)
//         }
//     }
//
//     const thunkWithHelloBye = thunk('hello', 'bye')
//
//     const fakeDispatch = (param) => {
//        if (typeof param === 'function')  {
//             param(fakeDispatch)
//         } else {
//            fakeDispatch(param)
//        }
//     }
//
//     // am I pure?
//     const aFn = (num) => {
//         return 20
//     }
//     // const state = {athing: "my thing"}
//     // console.log(useSelector(selectorFunction)(state))
//
// })
//
