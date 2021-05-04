import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from "axios";
import ReactHtmlParser, {htmlparser2} from 'react-html-parser';
import styled from 'styled-components';

const getWikiImage = (title, pageId) => new Promise((resolve) => {
    // https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=Jaguar&pithumbsize=500
    axios.get("https://en.wikipedia.org/w/api.php", {
        "Content-Type": "application/json",
        params: {
            action: 'query',
            prop: 'pageimages',
            titles: title.replace(' ', '_'),
            pithumbsize: 500,
            format: 'json',
            origin: '*',
        }
    }).then(response => resolve(response.data.query.pages[pageId].thumbnail.source))
})

const getWikiContent = (title, pageId) => new Promise((resolve) => {
    axios.get("https://en.wikipedia.org/w/api.php", {
        "Content-Type": "application/json",
        params: {
            action: 'query',
            prop: 'extracts',
            titles: title.replace(' ', '_'),
            format: 'json',
            origin: '*',
        }
    }).then(response => resolve(response.data.query.pages[pageId].extract))
})

const ContentContainter = styled.div`
width: 90%;
margin: 30px auto;
overflow-y: auto;
`

const SingleLikePage = (props) => {
    const { pageId } = useParams();
    const [htmlContent, setHtmlContent] = useState();
    const [imgUrl, setImgUrl] = useState();
    const title= props.location.locationProps.name
    const articleUrl = props.location.locationProps.url
    console.log(htmlContent)   
    
    function transform(node) {
        // do not render any <span> tags
        console.log(node)
        // if (node.type === 'tag' && node.name === 'span') {
        //   return null;
        // }
        return node
      }

    const preprocessNodes = (arg) => {
        console.log(arg)
        return arg
    }
    

    useEffect(() => {
        getWikiContent(title, pageId).then(response => setHtmlContent(response))
        getWikiImage(title, pageId).then(response => setImgUrl(response))
    }, [pageId])

    const parsed = ReactHtmlParser(htmlContent, {transform: transform, preprocessNodes: preprocessNodes})

    return (
        <ContentContainter>
            <h1>{title}</h1>
            <img src={imgUrl} alt="" />
            {parsed}
            <a href={articleUrl} className="btn btn-primary" target="_blank">Full Article</a>
        </ContentContainter>
    )
}

export default SingleLikePage


