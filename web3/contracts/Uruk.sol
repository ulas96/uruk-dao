



// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;



contract Uruk {

    struct Member {
        string nickname;
        uint256 memberId;
        address memberAddress;
        uint256 memberSince;
    }

    struct Article {
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
    mapping(address => Article[]) public articles;
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

    function publishArticle(string memory _article) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        Article storage currentarticle = articles[msg.sender].push();
        currentarticle.owner = msg.sender;
        currentarticle.id = articles[msg.sender].length;
        currentarticle.content = keccak256(abi.encodePacked(_article));
        currentarticle.timestamp = block.timestamp;
        currentarticle.supporters = new address[](0);
        currentarticle.tip = 0;
    }


    function editarticle(uint256 _articleId, string memory _newContent) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        require(articles[msg.sender].length >= _articleId, "article doesn't exist");
        articles[msg.sender][_articleId - 1].content = keccak256(abi.encodePacked(_newContent));
    }


    function supportarticle(address articleOwner, uint256 articleIndex, uint256 _value) public payable {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        require(_value >= msg.value, "Not enough ether");
        require(articles[articleOwner].length >= articleIndex, "article doesn't exist");
        articles[articleOwner][articleIndex - 1].supporters.push(msg.sender);
        articles[articleOwner][articleIndex - 1].tip += msg.value;
    }

    function addComment(address _articleOwner,uint256 _articleId, string memory _comment) public {
        require(members[msg.sender].memberAddress == msg.sender, "Not a member");
        Article storage _article = articles[_articleOwner][_articleId - 1];
        Comment memory currentComment = Comment({
            owner: msg.sender, 
            id: _article.comments.length + 1, 
            content: keccak256(abi.encodePacked(_comment)), 
            timestamp: block.timestamp
        });
        _article.comments.push(currentComment);
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

    function getMemberarticles(address _memberAddress) public view returns(Article[] memory) {
        return articles[_memberAddress];

    }

    function getMemberConnections(address _memberAddress) public view returns(address[] memory) {
        return connections[_memberAddress];
    }

    function isMember(address _memberAddress) public view returns(bool) {
        require(members[_memberAddress].memberAddress == _memberAddress,"Not a member");
        return true;
    }
}
