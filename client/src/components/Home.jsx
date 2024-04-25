import { useEffect } from "react";

const Home = ({active, setActive}) => {

    useEffect(() => {
        setActive('home')
    }, [])

    return (
    <div className="home-container">
    <div className="home-banner">
            <p>Welcome to Uruk</p>
            <p>Home to freedom and literacy</p>
            <p>Where everything is started</p>
        </div>
            
    </div> 
    );
};

export default Home;