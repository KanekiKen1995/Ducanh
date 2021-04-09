import React, { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.svg";
import List from "@material-ui/core/List";
import "../../../assets/css/components/MenuRight/index.scss";
import {
  frequentQuestions,
  addPromoCode,
  buyAGiftCard,
  chatWithUs,
  closeButton,
} from "../../../assets/icons/index";

const MenuRight = (props) => {
  const { toggleDrawer, handleOpensDialog } = props;
  const { t } = useTranslation();
  return (
    <div className="list">
      <div className="menu-top">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="CloseButton dark">
          <div className="icon-wrapper" onClick={toggleDrawer(false)}>
            <img src={closeButton} />
          </div>
        </div>
      </div>
      <div className="menu-items">
        <div className="MixtilesMenuItem" onClick={handleOpensDialog}>
          <img src={frequentQuestions} />
          <p>{t("menuRight.Frequent Questions")}</p>
        </div>
        {/* <div className="MixtilesMenuItem">
          <img src={addPromoCode} />
          <p>Add Promo Code</p>
        </div>
        <div className="MixtilesMenuItem">
          <img src={buyAGiftCard} />

          <p>Buy a Gift Card</p>
        </div> */}
        <div className="MixtilesMenuItem">
          <img src={chatWithUs} />
          <p>{t("menuRight.Chat with Us")}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuRight;
