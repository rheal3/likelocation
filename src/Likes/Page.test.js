import {render, screen} from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow'
import LikesPage from './Page'
import * as redux from "react-redux";

const mockUseSelector = () => {}
const mockUseDispatch = jest.fn()



// jest.mock('react-router', () => {
//     return {
//         useSelector: function (selector) {
//             console.log('mocked selector')
//             return []
//         },

//         useDispatch: function () {
//             console.log('mocked dispatch')
//             return () => {
//                 console.log('calling the dispatch fn')
//             }
//         }
//     }
// })

describe('LikesPage', () => {

    const useSelectorSpy = jest.spyOn(redux, "useSelector")
    useSelectorSpy.mockImplementation(() => {
        
    })

    test('empty state should show when likes are empty', () => {
        const spy = jest.spyOn(redux, 'useSelector')
        const renderer = new ShallowRenderer()
        // import {useDispatch, useSelector} from "react-redux";
        const rendered = renderer.render(<LikesPage/>);
        expect(mockedUseSelector).toBeCalledTimes(1)
    })
})

// test('empty test', () => {
//     expect(true).toBe(true)
// })