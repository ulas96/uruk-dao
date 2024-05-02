



// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;



contract Uruk {

    struct Member {
        string nickname;
        uint256 memberIndex;
        address memberAddress;
        uint256 memberSince;
    }

    struct Post {
        address owner;
        uint256 id;
        bytes32 content;
        uint256 timestamp;
        address[] supporters;
        uint256 tip;
        Comment[] comments;
    }

    struct Comment {
        address owner;
        uint256 id;
        bytes32 content;
        uint256 timestamp;
    }

    mapping(address => Member) public members;
    mapping(address => Post[]) public posts;
    mapping(address => address[]) public connections;
    address[] public memberAddresses;

    function becomeMember(string memory _nickname) public {
            require(members[msg.sender].memberAddress != msg.sender, "Already a member");
        for(uint i = 0; i < memberAddresses.length; i++) {
            require(keccak256(abi.encodePacked(members[memberAddresses[i]].nickname)) != keccak256(abi.encodePacked(_nickname)), "Nickname already taken");
        }
        members[msg.sender] = Member(_nickname, memberAddresses.length + 1, msg.sender, block.timestamp);
        memberAddresses.push(msg.sender);
    }

    function changeNickname (string memory _nickname) public{
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        for(uint i = 0; i < memberAddresses.length; i++) {
            require(keccak256(abi.encodePacked(members[memberAddresses[i]].nickname)) != keccak256(abi.encodePacked(_nickname)), "Nickname already taken");
        }

        members[msg.sender].nickname = _nickname;
    }

    function post(string memory _post) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        Post storage currentPost = posts[msg.sender].push();
        currentPost.owner = msg.sender;
        currentPost.id = posts[msg.sender].length;
        currentPost.content = keccak256(abi.encodePacked(_post));
        currentPost.timestamp = block.timestamp;
        currentPost.supporters = new address[](0);
        currentPost.tip = 0;
    }



    function deletePost(uint256 _postId) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        require(posts[msg.sender].length >= _postId, "Post doesn't exist");
        for(uint i = _postId - 1; i < posts[msg.sender].length - 1; i++) {
            posts[msg.sender][i] = posts[msg.sender][i + 1];
            posts[msg.sender][i].id = i - 1 ;
        }
        posts[msg.sender].pop();
    }

    function editPost(uint256 _postId, string memory _newContent) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        require(posts[msg.sender].length >= _postId, "Post doesn't exist");
        posts[msg.sender][_postId - 1].content = keccak256(abi.encodePacked(_newContent));
    }


    function supportPost(address postOwner, uint256 postIndex, uint256 _value) public payable {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        require(_value >= msg.value, "Not enough ether");
        require(posts[postOwner].length >= postIndex, "Post doesn't exist");
        posts[postOwner][postIndex - 1].supporters.push(msg.sender);
        posts[postOwner][postIndex - 1].tip += msg.value;
    }

    function addComment(address _postOwner,uint256 _postId, string memory _comment) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        Post storage _post = posts[_postOwner][_postId - 1];
        Comment memory currentComment = Comment(msg.sender, _post.comments.length + 1, keccak256(abi.encodePacked(_comment)), block.timestamp);
        _post.comments.push(currentComment);
    }

    function deleteComment(address _postOwner, uint256 _postId, uint256 _commentId) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        require(posts[_postOwner].length >= _postId, "Post doesn't exist");
        require(posts[_postOwner][_postId - 1].comments.length >= _commentId, "Comment doesn't exist");
        require(posts[_postOwner][_postId - 1].comments[_commentId - 1].owner == msg.sender, "Not the owner of the comment");
        for(uint i = _commentId - 1; i < posts[_postOwner][_postId - 1].comments.length - 1; i++) {
            posts[_postOwner][_postId - 1].comments[i] = posts[_postOwner][_postId - 1].comments[i + 1];
            posts[_postOwner][_postId - 1].comments[i].id = i - 1 ;
        }
        posts[_postOwner][_postId - 1].comments.pop();

    }

    function connect(address _memberAddress) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        require(members[_memberAddress].memberAddress == _memberAddress, "Not a member");
        connections[msg.sender].push(_memberAddress);
        connections[_memberAddress].push(msg.sender);
    }

    function disconnect(address _memberAddress) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        require(members[_memberAddress].memberAddress == _memberAddress, "Not a member");
        for(uint i = 0; i < connections[msg.sender].length; i++) {
            if(connections[msg.sender][i] == _memberAddress) {
                for(uint j = i; j < connections[msg.sender].length - 1; j++) {
                    connections[msg.sender][j] = connections[msg.sender][j + 1];
                }
                connections[msg.sender].pop();
            }
        }

        for(uint i = 0; i < connections[_memberAddress].length; i++) {
            if(connections[_memberAddress][i] == msg.sender) {
                for(uint j = i; j < connections[_memberAddress].length - 1; j++) {
                    connections[_memberAddress][j] = connections[_memberAddress][j + 1];
                }
                connections[_memberAddress].pop();
            }
        }
    }

    function getMember(address _memberAddress) public view returns(Member memory) {
        return members[_memberAddress];
    }

    function getMembers() public view returns(address[] memory) {
        return memberAddresses;
    }

    function getMemberPosts(address _memberAddress) public view returns(Post[] memory) {
        return posts[_memberAddress];

    }

    function getMemberConnections(address _memberAddress) public view returns(address[] memory) {
        return connections[_memberAddress];
    }
}
