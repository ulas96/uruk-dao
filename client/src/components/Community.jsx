import {useEffect, useState} from "react";


const Community = ({state, active, setActive}) => {

    const [articles, setArticles] = useState({});
    const getArticles = async () => {
        const article = await state.contract.getArticle(1);
        console.log(article);
        setArticles(article);
        console.log(articles);

    }



    useEffect(() => {
        setActive('community');
        getArticles();
    },  [])


    return (
        <div>
            <h1 color="white">Community</h1>
        </div>
    );
};

export default Community