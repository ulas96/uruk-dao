



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
        string content;
        uint256 timestamp;
        address[] supporters;
        uint256 support;
        Comment[] comments;
    }

    struct Comment {
        address owner;
        uint256 id;
        string content;
        uint256 timestamp;
    }



    mapping(address => Member) public members;
    mapping(address => uint256[]) public articleOwners;
    mapping(address => address[]) public connections;
    address[] public memberAddresses;
    Article[] public articles;

    function becomeMember(string memory _nickname) public {
            require(isMember(msg.sender), "Already a member");
        for(uint i = 0; i < memberAddresses.length; i++) {
            require(keccak256(abi.encodePacked(members[memberAddresses[i]].nickname)) != keccak256(abi.encodePacked(_nickname)), "Nickname already taken");
        }
        members[msg.sender] = Member(_nickname, memberAddresses.length + 1, msg.sender, block.timestamp);
        memberAddresses.push(msg.sender);
    }

    function changeNickname (string memory _nickname) public{
        require(isMember(msg.sender), "Not a member");
        for(uint i = 0; i < memberAddresses.length; i++) {
            require(keccak256(abi.encodePacked(members[memberAddresses[i]].nickname)) != keccak256(abi.encodePacked(_nickname)), "Nickname already taken");
        }
        members[msg.sender].nickname = _nickname;
    }

    function publishArticle(string memory _article) public {
        require(isMember(msg.sender), "Not a member");
        require(bytes(_article).length == 64);
        Article storage currentArticle = articles.push();
        currentArticle.owner = msg.sender;
        currentArticle.id = articles.length;
        currentArticle.content = _article;
        currentArticle.timestamp = block.timestamp;
        currentArticle.supporters = new address[](0);
        currentArticle.support = 0;
        articleOwners[msg.sender].push(currentArticle.id);
    }


    function editarticle(uint256 _articleId, string memory _newContent) public {
        require(isMember(msg.sender), "Not a member");
        require(bytes(_newContent).length == 64);
        require(articleOwners[msg.sender].length >= _articleId, "article doesn't exist");
        Article memory _currentArticle = articles[_articleId-1];
        require(_currentArticle.owner == msg.sender);
        articles[_articleId-1].content = _newContent;
    }


    function supportArticle(uint256 _articleId, uint256 _value) public payable {
        require(isMember(msg.sender), "Not a member");
        require(_value >= msg.value, "Not enough ether");
        require(articles.length >= _articleId, "article doesn't exist");
        articles[_articleId-1].supporters.push(msg.sender);
        articles[_articleId-1].support += msg.value;
    }

    function addComment(uint256 _articleId, string memory _comment) public {
        require(isMember(msg.sender), "Not a member");
        Article storage _article = articles[_articleId];
        Comment memory currentComment = Comment({
            owner: msg.sender, 
            id: _article.comments.length + 1, 
            content: _comment, 
            timestamp: block.timestamp
        });
        _article.comments.push(currentComment);
    }


    function connect(address _memberAddress) public {
        require(isMember(msg.sender), "Not a member");
        require(members[_memberAddress].memberAddress == _memberAddress, "Not a member");
        connections[msg.sender].push(_memberAddress);
        connections[_memberAddress].push(msg.sender);
    }

    function getArticle(uint256 _articleId) public view returns(Article memory _article) {
        _article = articles[_articleId];
    }

    function getMember(address _memberAddress) public view returns(Member memory) {
        return members[_memberAddress];
    }

    function getMembers() public view returns(address[] memory) {
        return memberAddresses;
    }

    function getMemberArticles(address _memberAddress) public view returns(uint256[] memory) {
        return articleOwners[_memberAddress];

    }

    function getMemberConnections(address _memberAddress) public view returns(address[] memory) {
        return connections[_memberAddress];
    }

    function isMember(address _memberAddress) public view returns(bool) {
        require(members[_memberAddress].memberAddress == _memberAddress,"Not a member");
        return true;
    }
}
