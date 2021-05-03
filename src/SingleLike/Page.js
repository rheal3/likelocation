import { useParams } from 'react-router-dom';

const SingleLikePage = () => {
    const { pageId } = useParams();

    return <div>single like {pageId}</div>
}

export default SingleLikePage