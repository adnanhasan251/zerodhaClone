import {
  AdjustOutlined,
  ExitToAppOutlined,
  GamepadOutlined,
  HelpOutlined,
  PermIdentityOutlined,
  PersonAddOutlined,
  ThumbsUpDownOutlined,
} from "@mui/icons-material";
import React from "react";
import classes from "../css/ProfileDropdown.module.css";

const ProfileDropdown = () => {
  const handleLogoutClick = () => {
    console.log("Logout clicked");
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h4>Arshey Mishra</h4>
        <p>mishraarshey@gmail.com</p>
      </div>
      <hr />
      <div className={classes.settings}>
        <PermIdentityOutlined className={classes.icon} />
        <h6>
          My profile <span>/ Settings</span>
        </h6>
      </div>
      <hr />
      <div className={classes.menus}>
        <div className={classes.menu}>
          <AdjustOutlined className={classes.icon} />
          <h6>Console</h6>
        </div>
        <div className={classes.menu}>
          <AdjustOutlined className={classes.icon} />
          <h6>Coin</h6>
        </div>
        <div className={classes.menu}>
          <ThumbsUpDownOutlined className={classes.icon} />
          <h6>Support</h6>
        </div>
        <div className={classes.menu}>
          <PersonAddOutlined className={classes.icon} />
          <h6>Invite friends</h6>
        </div>
      </div>
      <hr />
      <div className={classes.menus}>
        <div className={classes.menu}>
          <PersonAddOutlined className={classes.icon} />
          <h6>Tour Kite</h6>
        </div>
        <div className={classes.menu}>
          <GamepadOutlined className={classes.icon} />
          <h6>Keyboard shortcuts</h6>
        </div>
        <div className={classes.menu}>
          <HelpOutlined className={classes.icon} />
          <h6>Help</h6>
        </div>
        <div className={classes.menu} onClick={handleLogoutClick}>
          <ExitToAppOutlined className={classes.icon} />
          <h6>Logout</h6>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
