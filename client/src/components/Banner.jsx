import Navigation from "./Navigation";
import { homeStyling, profileStyling, communityStyling } from "../constants/main";
import { useEffect, useState } from "react";

const Banner = ({ active, setActive }) => {


    const [styling, setStyling] = useState({});


    useEffect(() => {
        const reloadStyling = () => {
            if (active === 'home') {
                setStyling(homeStyling);
            } else if (active === 'profile') {
                setStyling(profileStyling);
            } else if (active === 'community') {
                setStyling(communityStyling);
            }
        };
        reloadStyling();
    }, [active]); 



    console.log(styling.backgroundImage);

    return (
        <div className="banner-container" style={{ backgroundImage: styling.backgroundImage }}>
            <Navigation active={active} setActive={setActive} />
            <div className="banner-text">
                <div className="banner-text1">{styling.text1}<br/></div>
                <div className="banner-text2">{styling.text2}<br/></div>
                <div className="banner-text3">{styling.text3}<br/></div>
            </div>

        </div>
    );
}

export default Banner;