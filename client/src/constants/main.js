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
    textAlign: 'center',
    text1: 'Welcome to Uruk',
    text2: 'Home to freedom and literacy',
    text3: 'Where everything is started'
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
    textAlign: 'center',
    text1: 'Share your idea',
    text2: 'Develope the world',
    text3: 'Expand your project'
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
    textAlign: 'center',    
    text1: 'Welcome to Uruk',
    text2: 'Home to freedom and literacy',
    text3: 'Where everything is started'
};

export {logo, home, homeStyling, communityStyling, profileStyling};