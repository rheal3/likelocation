import axios from 'axios';

export const deleteLike = async (pageid) => {
    try {
        return await axios.delete(`http://localhost:8080/likes/${pageid}`).then()
    } catch (err) {
        return err
    }
}

const selectDatabaseProperties = (data) => {
    data['pageid'] = data['page_id']
    delete data['page_id']
    return data
}

const getLikes = async () => {
    try {
        return await axios.get("http://localhost:8080/likes", {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => res.data.map(selectDatabaseProperties))
    } catch (err) {
        return err
    }
}

export default getLikes