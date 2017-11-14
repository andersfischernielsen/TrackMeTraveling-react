import * as React from "react";

export class Landing extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1 className="display-3">Track Me Traveling! </h1>
                <p className="lead">This application allows you to show your friends and family where you are in the world when you're traveling. </p>
                <p>
                    The iOS app enables you to upload your location whenever you move around - either manually or automatically in the background.
                    Don't worry about power consumption - your location is only logged when you move a signifcant distance using the most power efficient method for geolocation.
                </p>
                <p>
                    This site will then let your friends, family and other followers see where you are in the world, and what cool sights and awesome pictures people have taken nearby. 
                </p>
            </div>
        );
    }
}

