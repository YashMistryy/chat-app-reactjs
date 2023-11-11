import React from "react";

const Search = () => {
  return (
    <div>
      <div className="search">
        <div className="searchForm">
          <input type="text" placeholder="enter a name .." />
        </div>
        
        <div className="userChat">
          <img
            src="https://myfaithmedia.org/wp-content/uploads/2016/01/iStock_000067347115_Medium.jpg"
            width={48}
            height={48}
            alt="img-user"
          />
          <div className="userChatInfo">
            <span>user</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
