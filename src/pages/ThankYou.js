import React from 'react';
import { useTranslation } from "react-i18next";
import StaticPage from '../containers/StaticPage'
import "../../src/assets/css/pages/StaticPages/ThankYou.scss";
import { useHistory } from "react-router-dom";

const styles = {
    icon : {
        width: '72px',
        height: '72px',
        color: '#52c41a',
        marginBottom: '30px'
    },
    action:{
        marginTop:'20px'
    },
    btn:{
        padding:'8px 15px',
        backgroundColor:'#fff',
        border: '1px solid #d9d9d9',
        borderRadius: '3px',
        cursor:'pointer',
        outline:'none'
    },
    primary:{
        backgroundColor:'#1890ff',
        border: '1px solid #1890ff',
        color:'#fff',
        marginRight:'8px'
    }
}

// JSON locale
// {
//     thankyou:{
//         "Thank You For Your Order!" : "Thank You For Your Order",
//         "Thank you message" : "Thank you message",
//         "Continue shopping" : "Continue shopping",
//         "Go to homepage" : "Go to homepage",
//     }
// }

const ThankYou = () => {
    const { t } = useTranslation();
    const history = useHistory();
    return <div>
        <StaticPage>
            <div className="ThankYouPage thankyou">
                <svg style={styles.icon} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                <div className="thankyou--heading">{t('thankyou.Thank You For Your Order!')}</div>
                <div className="thankyou--description">{t('thankyou.Thank you message')}</div>
                <div className="action" style={styles.action}>
                    <button onClick={() => history.push('/review') } style={{...styles.btn,...styles.primary}} className="primary btn">{t('thankyou.Continue shopping')}</button>
                    <button onClick={() => history.push('/') } style={styles.btn} className="btn">{t('thankyou.Go to homepage')}</button>
                </div>
            </div>

        </StaticPage>
    </div>
}
export default ThankYou
