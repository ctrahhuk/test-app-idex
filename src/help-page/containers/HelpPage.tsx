import * as React from "react";

import {connect} from 'react-redux';
import * as Actions from "../actions/profilePageActions";



export interface IUserPageProps {

}

type Props = typeof Actions & IUserPageProps;

class ProfilePageImpl extends React.PureComponent<Props, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return <>

        </>;
    }

}


export const ProfilePage = connect(
    ({profilePage}) => ({...profilePage}), {...Actions}
)(ProfilePageImpl);