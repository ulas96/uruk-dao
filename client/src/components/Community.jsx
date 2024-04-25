import {useEffect, useState} from "react";


const Community = ({state, active, setActive}) => {
    // const [members,setMembers] = useState([{
    //     nickname: null,
    //     memberIndex: null,
    //     memberAddress: null,
    //     memberSince: null,
    // }]);

    useEffect(() => {
        setActive('community')
    },  [])


    return (
        <div>
            <h1 color="white">Community</h1>
        </div>
    );
};

export default Community;