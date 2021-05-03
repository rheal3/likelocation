import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';


const ContentContainter = styled.div`
width: 90%;
margin: 30px auto;
`

const SingleLikePage = (props) => {
    const { pageId } = useParams();
    const title= props.location.locationProps.name
    const url = props.location.locationProps.url
    const [html, setHtml] = useState();
    useEffect(() => {
        axios.get("https://en.wikipedia.org/w/api.php", {
            "Content-Type": "application/json",
            params: {
                action: 'query',
                prop: 'extracts',
                titles: title.replace(' ', '_'),
                format: 'json',
                origin: '*',
            }
        }).then(response => setHtml(response.data.query.pages[pageId].extract))
    }, [pageId])

    return (
        <ContentContainter>
            <h1>{title}</h1>
            {ReactHtmlParser(html)}
            <a href={url} className="btn btn-primary" target="_blank">Full Article</a>
        </ContentContainter>
    )
}

export default SingleLikePage


