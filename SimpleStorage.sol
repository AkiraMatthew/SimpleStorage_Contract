// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; //>=0.8.7 <0.9.0 //^0.8.7; // 0.8.12 ^ means that any versuib above the selected, it means it will use any versuib abice ut

contract SimpleStorage {
    //boolean, uint, int, address, bytes

    //it's the same as uint public favoriteNumber = 0
    uint256 favoriteNumber; //it is implicitly a storage variable

    // uint256 public brothersFavoriteNumber;
    // uint256 public sisterssFavoriteNumber;

    // People public person = People({favoriteNumber: 2, name: "Akira"});
    // People public person = People({favoriteNumber: 3, name: "Ally"});
    // People public person = People({favoriteNumber: 7, name: "Chad"});

    mapping(string => uint256) public nameToFavoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    uint256[] public favoriteNumbersList;
    People[] public people;

    //0: 2, Patrick, 1: 7, John ...

    // virtual override, to a function from a contract be overridable from another contract, it needs the "virtual" keyword
    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;

        retrieve();
        //retrieve() //if a function with Cost Gas calls a function with "view" for example, it will be one of the only cases that a function with "pure or view" will spent gas
    }

    // view, pure; mostly are functions that do not spend gas to run
    function retrieve() public view returns (uint256) {
        // the returns means what the function will give us after calling it
        return favoriteNumber;
    }

    // calldata, memory, storage
    // calldata, and memory, means that the variable only will exist temporarily, during the transactions
    // storage variables exists even outside the function specified
    // you can use calldata if you don't end modifying the _name
    // string is secretly a array
    // memory and calldata can only be used for array, struct or mapping
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        //_name = "cat"; -> //not assigned to calldata
        // people.push(People(_favoriteNumber, _name));
        //or
        // People memory newPerson = People({favoriteNumber: _favoriteNumber, name: _name});
        // people.push(newPerson);
        //or
        // People memory newPerson = People(_favoriteNumber, _name);
        // people.push(newPerson);
        //or
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}

//Contract address: 0xd9145CCE52D386f254917e481eB44e9943F39138
