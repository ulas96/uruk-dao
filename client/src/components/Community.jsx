import {useState} from "react";

const Community = ({state}) => {
    const [members,setMembers] = useState([{
        nickname: null,
        memberIndex: null,
        memberAddress: null,
        memberSince: null,
    }]);
    const [memberPosts, setMemberPosts] = useState([{
        memberIndex: null,
        memberAddress: null,
        postIndex: null,
        postContent: null,
        postDate: null,
        postLikes: null,
        postComments: null,
    }]);
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