import logo from '../assets/uruk-logo.png';
import home from  '../assets/uruk-bg.png';
import community from '../assets/uruk-community.png';
import profile from '../assets/uruk-profile.png';

const homeStyling = {
    backgroundImage: `url(${home})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '1.5em',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px black',
    textAlign: 'center'
};

const communityStyling = {
    backgroundImage: `url(${community})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '1.5em',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px black',
    textAlign: 'center'
};

const profileStyling= {
    backgroundImage: `url(${profile})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '1.5em',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px black',
    textAlign: 'center'
};

export {logo, home, homeStyling, communityStyling, profileStyling};