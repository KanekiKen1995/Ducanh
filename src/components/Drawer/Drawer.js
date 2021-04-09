import React, { useState, useCallback } from "react";
import "./Drawer.scss";
import { useTranslation } from "react-i18next";

import boldIcon from "../../assets/boldIcon@2x.png";
import classicIcon from "../../assets/classicIcon@2x.png";
import cleanIcon from "../../assets/cleanIcon@2x.png";
import edgeIcon from "../../assets/edgeIcon@2x.png";
import everIcon from "../../assets/everIcon@2x.png";
import MenuCheckOut from "../MenuCheckOut/index";
import DialogActions from "../DialogAction";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AddAddress from "../AddAddress/index";
import { getUnitPrice } from "../../services/orders";

const SiderBar = (props) => {
  const { t } = useTranslation();
  const { tiles } = props;
  const [state, setState] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [hasAddress, setHasAddress] = React.useState(false);

  const [params, setParams] = useState({ country: "Việt Nam" });
  const [errors, setErrors] = useState({});

  const [errorsFullName, setErrorsFullName] = useState(false);

  const [loadingUnitPrice, setLoadingUnitPrice] = useState(false);
  const [unitPrice, setUnitPrice] = useState();

  const [checkoutMethod,setCheckoutMethod] = useState()
  const [vnpayCharge,setVnpayCharge] = useState()

  const [tempAddr,setTempAddr] = useState()

  const handleChangeValue = useCallback((field, valueChange) => {
    setParams((prevParams) => ({ ...prevParams, [field]: valueChange }));
    setErrorsFullName(false);
  });

  const handleClose = () => {
    setOpenDialog(false);
    setParams(tempAddr)
  };

  const handleOpensDialog = () => {
    setOpenDialog(true);
    setTempAddr(params)
  };
  const toggleDrawer = (value) => (event) => {
    setState(value);
  };
  const handleCheckout = () => {
    setLoadingUnitPrice(true)
    getUnitPrice().then(response => {
      setLoadingUnitPrice(false)
      setUnitPrice(response.data.unitPrice)
      setState(true)
    })

  }
  const toggleDrawerDialogPayment = (value) => (event) => {
    setStatePayment(value);
  };

  const handleUpdate = () => {
    //TODO fun create Address
    if (validate()) {
      setOpenDialog(false);
      setHasAddress(true);
    }

    setTimeout(() => {
      setErrors({});
    }, 200);
  };

  const validate = () => {
    let errorValidate = {};
    let numberErr = 0;
    const { fullName, street, phone } = params;
    if (!fullName || fullName.trim() === "") {
      numberErr++;
      errorValidate.fullName = true;
    }
    if (!street || street.trim() === "") {
      numberErr++;
      errorValidate.street = true;
    }
    if (!phone || phone.trim() === "") {
      numberErr++;
      errorValidate.phone = true;
    }

    if (fullName && fullName.trim().split(" ").length <= 1) {
      numberErr++;
      errorValidate.fullName = true;
      setErrorsFullName(true);
    }
    setErrors(errorValidate);
    if (numberErr > 0) {
      return false;
    }
    return true;
  };
  const allowCheckout = tiles.length > 0
  const isMobile = window.innerWidth < 1024
  return (
    <div className="Drawer">
      <div className="Drawer-paper">
        <Filter {...props} />
        <div className="bottom-button-container">
          <div className={"bottom-button " +(!allowCheckout && " grey")} onClick={allowCheckout ? handleCheckout : () => {}}>
            {loadingUnitPrice ? <div className="loader"></div> : t("menuCheckOut.Checkout")}
          </div>
          <SwipeableDrawer
            anchor={isMobile ? 'bottom' : 'right'}
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <MenuCheckOut
              isMobile={isMobile}
              toggleDrawer={toggleDrawer}
              openDialog={openDialog}
              handleOpensDialog={handleOpensDialog}
              selectedFrame={props.selectedFrame}
              tiles={tiles}
              address={params}
              hasAddress={hasAddress}
              unitPrice={unitPrice}
              checkoutMethod={checkoutMethod}
              setCheckoutMethod={setCheckoutMethod}
              vnpayCharge={vnpayCharge}
              setVnpayCharge={setVnpayCharge}
            />
          </SwipeableDrawer>
        </div>
      </div>
      <DialogActions
        handleClose={handleClose}
        open={openDialog}
        title={hasAddress ? t("menuCheckOut.Edit Address") : t("menuCheckOut.Add Address")}
        handleUpdate={handleUpdate}
        isUpdate
      >
        <AddAddress
          params={params}
          handleChangeValue={handleChangeValue}
          errors={errors}
          errorsFullName={errorsFullName}
        />
      </DialogActions>
    </div>
  );
};
const Filter = (props) => {
  const { t } = useTranslation();
  const filters = [
    {
      id: "ever",
      image: everIcon,
      title: t("review.filters.ever"),
      isPopular: true,
    },
    {
      id: "clean",
      image: cleanIcon,
      title: t("review.filters.clean"),
      isPopular: false,
    },
    {
      id: "classic",
      image: classicIcon,
      title: t("review.filters.classic"),
      isPopular: false,
    },
    {
      id: "bold",
      image: boldIcon,
      title: t("review.filters.bold"),
      isPopular: false,
    },
    // {
    //   id: "edge",
    //   image: edgeIcon,
    //   title: t("review.filters.edge"),
    //   isPopular: false,
    // },
  ];
  const { selectedFrame, setSelectedFrame } = props;
  return (
    <div className="filter-strip">
      {filters.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelectedFrame(item.id)}
          className={`filter-button ${
            item.isPopular ? "with-popular-badge" : ""
          } ${item.id == selectedFrame ? "selected" : ""}`}
          localizedpopularstring={t("review.filters.POPULAR")}
        >
          <img className="RetinaImage filter-image" src={item.image} />
          <div className="filter-bottom">
            <div className="filter-name">{item.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default { SiderBar, Filter };
