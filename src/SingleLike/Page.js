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
    const title = props.location.locationProps.name
    const [html, setHtml] = useState();
    useEffect(() => {
        // get info from wiki page => set into article
        // https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Woodwark,%20Queensland        
        axios.get("https://en.wikipedia.org/w/api.php", {
            "Content-Type": "application/json",
            params: {
                action: 'query',
                prop: 'extracts',
                titles: title.replace(' ', '_'),
                format: 'json',
                origin: '*',
                // exintro: 1
            }
        }).then(response => setHtml(response.data.query.pages[pageId].extract))

    }, [pageId])

    return (
        <ContentContainter>
            <h1>{title}</h1>
            {ReactHtmlParser(html)}
        </ContentContainter>
    )
}

export default SingleLikePage


