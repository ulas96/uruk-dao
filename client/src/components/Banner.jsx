import Navigation from "./Navigation"; 
import { homeStyling, profileStyling, communityStyling } from "../constants/main";
import { useEffect } from "react";

const Banner = ({active, setActive}) => {


    let styling = {
        backgroundImage: homeStyling.backgroundImage
    };


    useEffect( () => {
        const reloadStyling = () => {
            if(active === 'home') {
                styling.backgroundImage = homeStyling.backgroundImage;
            } else if(active === 'profile') {
                styling.backgroundImage = profileStyling.backgroundImage;
            } else if(active === 'community') {
                styling.backgroundImage = communityStyling.backgroundImage;
            }
        }
        reloadStyling();
    }, [active])


    console.log(homeStyling.backgroundImage);

    return (
        <div className="banner-container" style={{backgroundImage: styling.backgroundImage}}>
            <Navigation active={active} setActive={setActive}/>
            <div>
                {active}
            </div>

        </div>
    );
}

export default Banner;