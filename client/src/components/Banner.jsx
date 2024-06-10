import Navigation from "./Navigation";
import CommunityBanner from "./CommunityBanner";
import HomeBanner from "./HomeBanner";
import ProfileBanner from "./ProfileBanner";

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
                {active === "home" && <HomeBanner></HomeBanner>}
                {active === "community" && <CommunityBanner></CommunityBanner>}
                {active === "profile" && <ProfileBanner></ProfileBanner>}
            </div>

        </div>
    );
}

export default Banner;