import axios from 'axios';

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
        }).then(res => {
            return res.data.map(selectDatabaseProperties)
        })
    } catch (err) {
        return err
    }
}

export default getLikes