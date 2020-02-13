import React from 'react';

import './LandingPage.scss';

class LandingPage extends React.Component {
    render() {
        return (
            <div className="bannerContainer">
                <img className="landingPageBackground" alt="Mother carrying baby in air in front of multi-colored wall" src="https://raw.githubusercontent.com/emilykdewitt/ParentPicks/master/parentpicks.ui/public/Images/parentpicksbackgroundfinal.png" />
            </div>
        )
    }
}

export default LandingPage;