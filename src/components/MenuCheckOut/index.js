import React, { useEffect, useState, useRef } from "react";
import Drawer from '@material-ui/core/Drawer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import EditIcon from '@material-ui/icons/Edit';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../../assets/css/components/MenuCheckOut/index.scss";
import {
  addAddress,
  addPaymentMethod,
  closeButton,
} from "../../assets/icons/index";
import { putOrder, generateVNPayInvoiceUrl, getOrderStatus } from "../../services/orders";

Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}

const MenuCheckOut = (props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { isMobile,toggleDrawer, openDialog,handleOpensDialog,selectedFrame, tiles, address, hasAddress, unitPrice,checkoutMethod,setCheckoutMethod,vnpayCharge,setVnpayCharge  } = props;

  const [openCheckoutMethodSelect,setOpenCheckoutMethodSelect] = useState(false)
  const [loadingVNPayCharge, setLoadingVNPayCharge] = useState(false)

  const [activeButton, setActiveButton] = useState(false);
  const [loadingPlaceOrderButton, setLoadingPlaceOrderButton] = useState(false)

  const handleSelectMethod = (method) => {
    setCheckoutMethod(method)
    setOpenCheckoutMethodSelect(false)
    if(method == 'vnpay'){
      setLoadingVNPayCharge(true)
      generateVNPayInvoiceUrl({quantity:tiles.length}).then((response) => {
        setLoadingVNPayCharge(false)
        if(response.data.vnpay_url){
          setVnpayCharge(response.data)
        }
      }).catch(() => {
        alert('Something went wrong, please try again')
      })
    }
  }
  const handleClickCheckoutWithVNPay = (e) => {
    if(!activeButton){
      e.preventDefault()
      return;
    }
    document.addEventListener('visibilitychange', syncOrderStatus,false)
    setLoadingVNPayCharge(true)
  }
  const handSubmitData = () => {
    setLoadingPlaceOrderButton(true)
    var dataPush = {
      imgs: [],
      selectedFrame : selectedFrame,
      address: address,
      checkout_method : document.getElementById('checkout_method').getAttribute('data-value')
    };
    const idCharge = document.getElementById('vnpay') && document.getElementById('vnpay').getAttribute('data-id')
    if(idCharge){
      dataPush.charge_id = idCharge
    }
    tiles?.forEach((e) => {
      dataPush.imgs.push(e.croppedImage);
    });
    putOrder(dataPush).then(response => {
      setLoadingPlaceOrderButton(false)
      history.push('/thankyou')
    })
  };

  const syncOrderStatus = () => {
    const id = document.getElementById('vnpay') && document.getElementById('vnpay').getAttribute('data-id')
    const vnpayCharge = document.getElementById('vnpay') && JSON.parse(document.getElementById('vnpay').getAttribute('data-json'))
    if (id && document.visibilityState === 'visible') {
      getOrderStatus({ id: id }).then((response) => {
        setVnpayCharge({
          ...vnpayCharge,
          status:response.data.status
        })
        if (response.data.status == 'paid') {
          setLoadingVNPayCharge(false)
          l('Paid , and submit the rest')
          document.removeEventListener('visibilitychange', syncOrderStatus)
          handSubmitData()
        }
      })
    }
  }

  useEffect(() => {
    if (tiles.length > 0 && hasAddress && checkoutMethod) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [tiles, hasAddress, checkoutMethod]);

  useEffect(() => {
    setLoadingVNPayCharge(false)
    document.removeEventListener('visibilitychange', syncOrderStatus)
  },[openDialog,openCheckoutMethodSelect])

  useEffect(() => {
    if(checkoutMethod && checkoutMethod == 'vnpay'){
      handleSelectMethod('vnpay')
    }
  },[])

  const SubmitButton = <button className={`bottom-button-container`}  disabled={loadingPlaceOrderButton} onClick={activeButton ? handSubmitData : () => { }}>
    <div className={`bottom-button ${!activeButton && 'grey'}`}>
      {loadingPlaceOrderButton ? <div className="loader"></div> : t("menuCheckOut.Place Order")}
    </div>
  </button>
  return (
    <div className={"checkout-sheet"+ (!isMobile ? ' right-drawer' : '')} >
      <div id="checkout_method" data-value={checkoutMethod}></div>
      <div id="vnpay" data-id={vnpayCharge?.id} data-json={JSON.stringify(vnpayCharge)}></div>
      {!isMobile && <div className="checkout-title">{t("menuCheckOut.Checkout2")}</div>}
      <div className="checkout-content">
        {!isMobile && <div className="CloseButton dark">
          <div className="icon-wrapper" onClick={toggleDrawer(false)}>
            <img src={closeButton} />
          </div>
        </div>}
        <div
          className="sheet-button with-lower-text highlighted"
          onClick={handleOpensDialog}
        >
          <div className="button-icon highlighted">
            <svg width="18px" height="17px"
              viewBox="0 0 18 17" class="icon-image"
              alt="Button" xmlns="http://www.w3.org/2000/svg"><title>86FB23A4-6393-40F9-A8A9-C9FFBADB5AD6</title><desc>Created with sketchtool.</desc><g id="freetrial-v2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="checkout-copy-4-(1)" transform="translate(-19.000000, -200.000000)" fill="#FF0077"><g id="Overlay" transform="translate(0.000000, -1.000000)"><g id="Sheet" transform="translate(0.000000, 174.500000)"><path d="M28.5184971,26.7164491 L36.9145288,34.7333943 C37.0920467,34.8488355 36.9736991,35.1374431 36.7370146,35.1374431 L34.785833,35.1374431 L34.785833,42.7503222 C34.785833,43.154371 34.4307973,43.5 34.0173163,43.5 L30.7657678,43.5 C30.3515655,43.5 29.9972511,43.1536674 29.9972511,42.7503222 L29.9972511,39.0013173 C29.9972511,36.4059337 25.9764105,36.4059337 25.9764105,39.0013173 L25.9764105,42.7503222 C25.9764105,43.154371 25.6805594,43.5 25.2670604,43.5 L21.9563633,43.5 C21.542161,43.5 21.2470132,43.1536674 21.2470132,42.7503222 L21.2470132,35.1374431 L19.2366827,35.1374431 C19,35.1374431 18.9408317,34.8488443 19.0591685,34.7333943 L27.4552005,26.7164491 C27.7510516,26.4278503 28.2237172,26.4278503 28.5195683,26.7164491 L28.5184971,26.7164491 Z" id="house"></path></g></g></g></g>
            </svg>
          </div>
          <div className="text bold selected-method">
            {hasAddress ? <> {t("menuCheckOut.Edit Address")} <EditIcon /></> : t("menuCheckOut.Add Address")}
          </div>
        </div>
        <div className="sheet-button highlighted">
          <div className="button-icon highlighted">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none" class="icon-image" alt="Button"><path fillRule="evenodd" clipRule="evenodd" d="M1.39932 0C0.627959 0 0 0.635635 0 1.41312V10.5896C0 11.3671 0.627959 12 1.39932 12H17.598C18.3694 12 19 11.3644 19 10.5896V1.41312C19 0.635635 18.3694 0 17.598 0H1.39932ZM17.2578 4.1074V2.23909C17.2578 2.11789 17.1625 2.02182 17.0422 2.02182H12.8977C12.7801 2.02182 12.6821 2.11968 12.6821 2.23909V4.1074C12.6821 4.22591 12.7792 4.32467 12.8977 4.32467H17.0422C17.1571 4.32467 17.2578 4.2295 17.2578 4.1074ZM14.2027 9.7708C14.0825 9.7708 13.9845 9.67294 13.9845 9.55353V9.1199C13.9845 9.00139 14.0816 8.90263 14.2027 8.90263H17.0396C17.1572 8.90263 17.2551 9.00049 17.2551 9.1199V9.55353C17.2551 9.67204 17.158 9.7708 17.0396 9.7708H14.2027ZM10.2426 9.7708C10.125 9.7708 10.027 9.67294 10.027 9.55353V9.12169C10.027 9.00049 10.1241 8.90442 10.2426 8.90442H13.0822C13.1998 8.90442 13.2978 9.00228 13.2978 9.12169V9.55353C13.2978 9.67204 13.2007 9.7708 13.0822 9.7708H10.2426ZM6.28522 9.7708C6.16765 9.7708 6.06967 9.67294 6.06967 9.55353V9.12169C6.06967 9.00049 6.16675 8.90442 6.28522 8.90442H9.12482C9.24239 8.90442 9.34037 9.00228 9.34037 9.12169V9.55353C9.34037 9.67204 9.24328 9.7708 9.12482 9.7708H6.28522ZM2.32784 9.7708C2.21027 9.7708 2.11229 9.67294 2.11229 9.55353V9.12169C2.11229 9.00049 2.20938 8.90442 2.32784 8.90442H5.16744C5.28501 8.90442 5.38299 9.00228 5.38299 9.12169V9.55353C5.38299 9.67204 5.28591 9.7708 5.16744 9.7708H2.32784Z" fill="#ff0073"></path>
            </svg>
          </div>
          <React.Fragment>
            {checkoutMethod == 'cod' ? (
              <div className="text bold selected-method" onClick={() => setOpenCheckoutMethodSelect(true)} >{t("menuCheckOut.Cash on Delivery")} <EditIcon /></div>
            ) : checkoutMethod == 'vnpay' ? (
              <div className="text bold selected-method" onClick={() => setOpenCheckoutMethodSelect(true)} >{t("menuCheckOut.VNPay")} <EditIcon /></div>
            ) : (
              <div className="text bold" onClick={() => setOpenCheckoutMethodSelect(true)}>{t("menuCheckOut.Add Payment Methods")}</div>
            )}
            <Drawer className={'drawer-checkout-method-selector'} anchor={'bottom'} open={openCheckoutMethodSelect} onClose={() => setOpenCheckoutMethodSelect(false)}>
              <div className="buttons">
                <div className={"dialog-button with-icon"} onClick={() => handleSelectMethod('cod')}>
                  <AttachMoneyIcon />
                  <p>{t("menuCheckOut.Cash on Deliverys")}</p>
                </div>
                {/*<div className={"dialog-button with-icon"} onClick={() => handleSelectMethod('vnpay')}>*/}
                {/*  <LocalAtmIcon />*/}
                {/*  <p>{t("menuCheckOut.VNPays")}</p>*/}
                {/*</div>*/}
              </div>
            </Drawer>
          </React.Fragment>

        </div>
        <div className="order-summary-container">
          {tiles.length ? (
              <div className="OrderSummary">
                <div className="separator" />
                <div className="summary-item" style={{marginBottom:'20px'}}>{t("menuCheckOut.Free shipping note")}</div>
                <div className="separator" />
                <div className="summary-item">
                  <div className="text"><span className="summary-text"><span>{t("menuCheckOut.tiles")} {tiles.length} {t("menuCheckOut.unit")}  </span></span></div>
                  <div className="value"><span>{(tiles.length*unitPrice).format()} VND</span></div>
                </div>
                <div className="summary-item">
                  <div className="text"><span className="summary-text">{t("menuCheckOut.Shipping")}</span></div>
                    {tiles.length >= 4 ? <div className="value">Miễn Phí</div> : <div className="value">40.000 đ</div>}
                  {/*<div className="value">40,000 đ</div>*/}
                </div>
                <div className="summary-item strong">
                  <div className="text"><span className="summary-text">{t("menuCheckOut.Total")}</span></div>
                  <div className="value">{(tiles.length >= 4 ? tiles.length*unitPrice :  tiles.length*unitPrice + 40000).format()} VND</div>
                </div>
              </div>
          ) : (
            <>
            <div className="separator"></div>
            <div className="summary-item no-tiles">
              <div className="text">
                  <span className="summary-text">{t("menuCheckOut.Add some tiles")}</span>
                </div>
              <div className="value"></div>
            </div>
            </>
          )}

        </div>
        <div>
          {checkoutMethod == 'cod' ? <>{SubmitButton}</> : checkoutMethod == 'vnpay' ? (
            <>
            {vnpayCharge && (
              <>
                {(!vnpayCharge.status || vnpayCharge.status !== 'paid') ? (
                  <a className="bottom-button-container" href={vnpayCharge.vnpay_url} target="_blank" onClick={handleClickCheckoutWithVNPay}>
                    <div className={`bottom-button ${!activeButton && 'grey'}`}>
                      {loadingVNPayCharge ? <div className="loader"></div> : 'Checkout with VNPay'}
                    </div>
                  </a>
                ) : vnpayCharge.status == 'paid' ? <>{SubmitButton}</> : <></>}
              </>
            )}
            </>
          ) : <>{SubmitButton}</>}


        </div>
      </div>
    </div>
  );
};

export default MenuCheckOut;
