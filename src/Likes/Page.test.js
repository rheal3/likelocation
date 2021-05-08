// import {render, screen} from '@testing-library/react';
// import ShallowRenderer from 'react-test-renderer/shallow'
// import LikesPage from './Page'
// import * as redux from "react-redux";

// jest.mock('react-redux', () => {
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

// describe('LikesPage', () => {

//     test('empty state should show when likes are empty', () => {
//         const spy = jest.spyOn(redux, 'useSelector')
//         const renderer = new ShallowRenderer()
//         // import {useDispatch, useSelector} from "react-redux";
//         const rendered = renderer.render(<LikesPage/>);
//         console.log(rendered.getElementsByTagName('h1'))
//         expect(mockedUseSelector).toBeCalledTimes(1)
//     })
// })

test('empty test', () => {
    expect(true).toBe(true)
})