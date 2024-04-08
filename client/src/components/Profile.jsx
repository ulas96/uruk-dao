import {useAccount, useConfig} from "wagmi";
import {useEffect, useState} from "react";
import Post from "./Post.jsx";
const Profile = ({state, active, setActive}) => {
        const {config} = useConfig();
        const account = useAccount({
            config,
        });
        const [member, setMember] = useState({
            nickname: null,
            memberIndex: null,
            memberAddress: null,
            memberSince: null,
        });

        const [memberPosts, setMemberPosts] = useState([]);


    const getMember = async (_memberAddr) => {
        const _member = await state.contract.getMember(_memberAddr);
        setMember({
            nickname: _member.nickname,
            memberIndex: _member.memberIndex,
            memberAddress: _member.memberAddress,
            memberSince: _member.memberSince,
        });
    };

    const  getMemberPosts = async (_memberAddr) => {
        const _memberPosts = await state.contract.getMemberPosts(_memberAddr);
        setMemberPosts(_memberPosts);
    };


    useEffect(() => {
        setActive('profile')
    }, [active]);



    return (
        <div className="post-container">
            <p>{member.nickname}</p>
            <div>{memberPosts.map((post) => {
                return (<div className="post">
                    <div className="content">
                        <p>{post.content}</p>
                    </div>

                    <div className="post-info">
                        <div className="post-owner">
                            <p>{post.owner}</p>
                        </div>
                        <div className="post-time">
                            {new Date(post.timestamp * 1000).toLocaleDateString()}
                        </div>
                    </div>
                </div>)
            })}</div>

            <></>
        </div>
    );
};

export default Profile;