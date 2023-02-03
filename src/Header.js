import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {

  const [{ basket , user} , dispatch] = useStateValue();

  //logout functionality
  const handleAuthentication = () => {
    if(user) {
      auth.signOut();
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
 
      <div className="header__nav">
      <Link to={!user && "/login"}>
        <div onClick={handleAuthentication} class="header__option">
          <span className="header__optionLineOne">Hello, {user ? user.email : 'Guest'}</span>
          <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
        </div>
      </Link>

      <Link to="/orders">
        <div class="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
      </Link>

        <div class="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div class="header__optionBasket">
            <ShoppingBasketIcon />
            <span class="header__optionLineTwo header__basketCount">{basket.length} </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
