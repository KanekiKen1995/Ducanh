import React, {useState} from 'react';
import './Footer.scss'
import {useTranslation} from 'react-i18next';
import {Link} from "react-router-dom";
import {localeEn, localeVi} from '../../assets/icons'

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const Footer = () => {
    const {t, i18n} = useTranslation();
    const [openLangSelector, setOpenLangSelector] = useState(false)
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang)
    }
    const languages = [
        {
            flag: localeEn,
            label: "English",
            id: "en"
        },
        {
            flag: localeVi,
            label: "Vietnamese",
            id: "vi"
        },
    ]
    const selectedLang = languages.find(x => x.id == i18n.language)
    return <div>
        <div className="HomeBottomMenu-desktop">
            {/*<div className="MenuItem">*/}
            {/*    <Link to="/careers" target="_self">*/}
            {/*        {t("menuFooter.CAREERS")}*/}
            {/*    </Link>*/}
            {/*</div>*/}
            <div className="MenuItem">
                <Link to="/terms-of-service" target="_blank">
                    {t("menuFooter.TERMS OF USE")}
                </Link>
            </div>
            <div className="MenuItem">
                <Link to="/accessibility-statement" target="_blank">
                    {t("menuFooter.ACCESSIBILITY STATEMENT")}
                </Link>
            </div>
            <div className="MenuItem">
                <Link to="/privacy-notice" target="_blank">
                    {t("menuFooter.PRIVACY POLICY")}
                </Link>
            </div>
            <div className="MenuItem">
                <Link to="/impressum" target="_blank">
                    {t("menuFooter.IMPRESSUM")}
                </Link>
            </div>
            {/*<div className="MenuItem">*/}
            {/*    <a target="_self">{t("menuFooter.CONTACT")}</a>*/}
            {/*</div>*/}
        </div>

        <div className="HomeBottomMenu-mobile">
            <div className="top">
                {/*<div className="MenuItem">*/}
                {/*    <Link to="/careers" target="_self">*/}
                {/*        {t("menuFooter.CAREERS")}*/}
                {/*    </Link>*/}
                {/*</div>*/}
                {/*<div className="MenuItem">*/}
                {/*    <a target="_self">{t("menuFooter.CONTACT")}</a>*/}
                {/*</div>*/}
            </div>
            <div className="bottom">
                <div className="part-a">
                    <div className="MenuItem">
                        <Link to="/terms-of-service" target="_blank">
                            {t("menuFooter.TERMS OF USE")}
                        </Link>
                    </div>
                    <div className="MenuItem">
                        <a target="_self">|</a>
                    </div>
                    <div className="MenuItem">
                        <Link to="/accessibility-statement" target="_blank">
                            {t("menuFooter.ACCESSIBILITY STATEMENT")}
                        </Link>
                    </div>
                    <div className="MenuItem">
                        <a target="_self">|</a>
                    </div>
                    <div className="MenuItem">
                        <Link to="/privacy-notice" target="_blank">
                            {t("menuFooter.PRIVACY POLICY")}
                        </Link>
                    </div>
                    <div className="MenuItem">
                        <a target="_self">|</a>
                    </div>
                    <div className="MenuItem">
                        <Link to="/impressum" target="_blank">
                            {t("menuFooter.IMPRESSUM")}
                        </Link>
                    </div>
                </div>
                <div className="part-b">© Copyright By LLLLLL</div>
            </div>
        </div>


        <div className="language_selector_wrapper">
            <div className="trigger" onClick={() => setOpenLangSelector(true)}>
                <div className="arrow"></div>
                <img className="flag" src={selectedLang.flag}/>
                <span>{selectedLang.label}</span>
            </div>
            <Dialog aria-labelledby="language_selector_title" open={openLangSelector} maxWidth='sm'>
                <MuiDialogTitle disableTypography className={'lang-selector-topbar'} id="language_selector_title">
                    <IconButton aria-label="close" className={'lang-selector-topbar--close-button'}
                                onClick={() => setOpenLangSelector(false)}>
                        <CloseIcon/>
                    </IconButton>
                    <span className={'lang-selector-topbar--title'}>{"Change Language"}</span>
                    <span className={'lang-selector-topbar--done-button'}></span>
                </MuiDialogTitle>
                <MuiDialogContent className="lang-selector-content">
                    <div className="dialog-content language-selector-content">
                        <ul className="languages-list ">
                            {languages.map(lang => (
                                <li onClick={i18n.language != lang.id ? () => {
                                    handleChangeLanguage(lang.id);
                                    setOpenLangSelector(false)
                                } : () => {
                                }} className={i18n.language == lang.id ? "selected" : ""}><img className="flag"
                                                                                               src={lang.flag}
                                                                                               alt="flag"/><span>{lang.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </MuiDialogContent>
            </Dialog>
        </div>
    </div>
}
export default Footer
