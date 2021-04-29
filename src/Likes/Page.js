import styled from 'styled-components';
import {useSelector} from "react-redux";

const insertData = (allLikes) => {
    const tableData = allLikes.map(location => {
        return (
            <tr key={location.pageid}>
                <th scope="row"><a href="">{location.title}</a></th>
                {/* <td>{location.pageid}</td> */}
                <td><i class="fas fa-trash-alt"></i></td>
            </tr>
        )
    })
    return tableData
}

const LikesContainer = styled.div`
  font-family: Roboto;
  width: 100%;
`

const LikesPage = () => {
    const allLikes = useSelector((state => state.likes.likes));

    return (
        <LikesContainer> 
            <h1>title - likes page</h1>
            <div>
                <table class="table" data-link="row">
                <thead>
                    <tr>
                    <th scope="col">Liked Locations</th>
                    {/* <th scope="col">Wiki Article</th> */}
                    <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {insertData(allLikes)}
                </tbody>
                </table>
            </div>
        </LikesContainer>
    )
}

export default LikesPage