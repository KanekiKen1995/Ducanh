import { Panorama } from "@material-ui/icons";
import React, { useEffect } from "react";
import "../../assets/css/components/AddAddress/index.scss";
import { useTranslation } from "react-i18next";
const AddAddress = (props) => {
  const { t } = useTranslation();
  const { params, handleChangeValue, errors, errorsFullName } = props;
  const classNameRender = (errs) => {
    if (errs) {
      return "FormInput invalidate newFormStyle";
    }
    return "FormInput newFormStyle";
  };
  return (
    <div className="address-form mixtiles-form">
      {errorsFullName && (
        <div className="error">
          <div>
            {t("address.Please insert your full name (first and last name)")}{" "}
          </div>
        </div>
      )}
      <form noValidate>
        <div className="newInputWrapper">
          <div className="InputLabel">{t("address.Full Name")} *</div>
          <input
            className={classNameRender(errors?.fullName)}
            type="text"
            name="fullName"
            placeholder={t("address.Full Name placeholder")}
            maxLength="80"
            onChange={(e) => handleChangeValue("fullName", e.target.value)}
            defaultValue={params?.fullName}
          />
        </div>
        <div className="newInputWrapper">
          <div className="InputLabel">{t("address.phone")} *</div>
          <input
            className={classNameRender(errors?.phone)}
            type="text"
            name="phone"
            placeholder={t("address.phone placeholder")}
            maxLength="80"
            onChange={(e) => handleChangeValue("phone", e.target.value)}
            defaultValue={params?.phone}
          />
        </div>
        <div className="newInputWrapper">
          <div className="InputLabel">{t("address.Address")} *</div>
          <input
            className={classNameRender(errors?.street)}
            type="text"
            name="street"
            placeholder={t("address.Street, House Number")}
            maxLength="80"
            onChange={(e) => handleChangeValue("street", e.target.value)}
            defaultValue={params?.street}
          />
        </div>
        <div className="newInputWrapper">
          <div className="InputLabel">{t("address.email")}</div>
          <input
            className={classNameRender(errors?.email)}
            type="text"
            name="email"
            placeholder={t("address.email placeholder")}
            maxLength="80"
            onChange={(e) => handleChangeValue("email", e.target.value)}
            defaultValue={params?.email}
          />
        </div>
        <div className="newInputWrapper">
          <div className="InputLabel">{t("address.note")}</div>
          <input
            className={classNameRender(errors?.Note)}
            type="text"
            name="note"
            placeholder={t("address.note placeholder")}
            maxLength="80"
            onChange={(e) => handleChangeValue("note", e.target.value)}
            defaultValue={params?.note}
          />
        </div>
        <input className="DummySubmit" type="submit" />
      </form>
    </div>
  );
};
export default AddAddress;
