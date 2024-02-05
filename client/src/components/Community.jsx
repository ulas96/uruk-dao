import {useState} from "react";

const Community = ({state}) => {
    const [members,setMembers] = useState([{
        nickname: null,
        memberIndex: null,
        memberAddress: null,
        memberSince: null,
    }]);




    return (
        <div>
            <h1 color="white">Community</h1>
        </div>
    );
};

export default Community;