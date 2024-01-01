import {useState} from "react";

const Community = ({state}) => {
    const [members,setMembers] = useState([]);
    const [memberPosts, setMemberPosts] = useState([]);
    const getMemberPosts = async (_memberAddr) => {
        const memberPosts = state.contract.getMemberPosts(_memberAddr);
        setMemberPosts(memberPosts);
    }
    const getMembers = async () => {
        const _members = await state.contract.getMembers();
        setMembers(_members);
    }



    return (
        <div>
            <h1 color="white">Community</h1>
        </div>
    );
};

export default Community;