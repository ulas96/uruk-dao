// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;



contract Uruk {

    struct Member {
        uint256 memberIndex;
        address memberAddress;
        uint postCount;
        uint256 memberSince;
    }

    mapping(address => Member) public members;
    mapping(address => string[]) public posts;
    address[] public memberAddresses;

    function becomeMember() public {
        require(members[msg.sender].memberAddress != msg.sender, "Already a member");
        members[msg.sender] = Member(memberAddresses.length, msg.sender, 0, block.timestamp);
        memberAddresses.push(msg.sender);
    }

    function post(string memory post) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        posts[msg.sender].push(post);
        members[msg.sender].postCount++;
    }

    function getMemberCount() public view returns(uint256) {
        return memberAddresses.length;
    }
}
