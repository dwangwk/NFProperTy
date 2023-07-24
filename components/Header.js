import React from "react";
import { Menu } from "semantic-ui-react";
import ConnectWallet from "./ConnectWallet";
import { Link } from "../routes";

export default () => {
    return (
      <Menu style={{ marginTop: '20px'}} fluid borderless className="cardborder">
        <Link route="/">
          <a className="item">
            NFProperty
          </a>
        </Link>
        <Menu.Menu position="right">
        <Link route="/">
          <a className="item">
            Listings
          </a>
        </Link>
        <Link route="/listings/new">
          <a className="item">
            +
          </a>
        </Link>
        </Menu.Menu>
        <ConnectWallet />
      </Menu>
    );
  }