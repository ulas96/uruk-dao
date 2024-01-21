import {useAccount, useConfig} from "wagmi";
import {useEffect, useState} from "react";

const Profile = ({state}) => {
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
        getMember(account.address).then().catch();
        getMemberPosts(account.address).then().catch();
    }, []);


    return (
        <div>
            <h1>{member.nickname}</h1>
            <div>{
                memberPosts.map((post) => {
                    return (
                        <div>
                            <h2>{post.content}</h2>
                        </div>
                    )
                })
            }</div>
        </div>
    );
};

export default Profile;