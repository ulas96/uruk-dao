// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;



contract Uruk {

    struct Member {
        string nickname;
        uint256 memberIndex;
        address memberAddress;
        uint256 memberSince;
    }

    mapping(address => Member) public members;
    mapping(address => string[]) public posts;
    mapping(address => address[]) public connections;
    address[] public memberAddresses;

    function becomeMember(string memory _nickname) public {
        require(members[msg.sender].memberAddress != msg.sender, "Already a member");
        members[msg.sender] = Member(_nickname, memberAddresses.length + 1, msg.sender, block.timestamp);
        memberAddresses.push(msg.sender);
    }

    function post(string memory _post) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        posts[msg.sender].push(_post);
    }

    function connect(address _memberAddress) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        require(members[_memberAddress].memberAddress == _memberAddress, "Not a member");
        connections[msg.sender].push(_memberAddress);
        connections[_memberAddress].push(msg.sender);
    }

    function getMember(address _memberAddress) public view returns(Member memory) {
        return members[_memberAddress];
    }

    function getMembers() public view returns(address[] memory) {
        return memberAddresses;
    }

    function getMemberPosts(address _memberAddress) public view returns(string[] memory) {
        return posts[_memberAddress];

    }

    function getConnectionCount(address _memberAddress) public view returns(address[] memory) {
        return connections[_memberAddress];
    }
}
