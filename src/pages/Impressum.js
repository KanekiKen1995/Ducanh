import React from 'react';
import StaticPage from '../containers/StaticPage'
import "../../src/assets/css/pages/StaticPages/Impressum.scss";

const Impressum = () => {
    return <div>
        <StaticPage>
        <div className="ImpressumPage">
            <p><strong>Ấn tượng.</strong></p>
            <p><span style={{fontWeight: 400}}>Ấn tượng</span></p>
            <p><span style={{fontWeight: 400}}>Tên: Mixtiles Việt Nam.</span></p>
            <p>&nbsp;</p>
            <p><span style={{fontWeight: 400}}>Địa chỉ:</span></p>
            <p><span style={{fontWeight: 400}}>Hà Nội</span></p>
            <p>&nbsp;</p>
            <p><span style={{fontWeight: 400}}>Phòng thương mại #:</span></p>
            <p><span style={{fontWeight: 400}}>70641366</span></p>
            <p><br /><br /></p>
        </div>
        </StaticPage>
    </div>
}
export default Impressum
