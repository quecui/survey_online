import React from 'react'

class About extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.props = props;
    }

    render() {
        return (
            <div className="page-body">
                <div className={'page-mid-space'} />
                <div className="page-content">
                    <div className={'about-content'}>
                        <b>
                            Author: Storm Spirit <br/>
                            From: Viet Nam <br/>
                            Project Name: Survey Online<br/>
                            Architecture: Client - Server<br/>
                            Client: ReactJs - ReduxJs - Axios - React Bootstrap<br/>
                            Server: Express - MongoDB<br/>
                            Love to: Hard Grass
                        </b>
                    </div>
                </div>
            </div>
        )
    }
}

export default About
