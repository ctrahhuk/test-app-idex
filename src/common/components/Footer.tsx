import * as React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as _ from "lodash";
import * as Actions from "../actions/commonActions";
import { Icon } from "../components/icon/Icon";


const HeaderContent = styled.section`
    width: 100%;
    height: 10rem;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


const Title = styled.section`
    width: 160rem;
    height: 100%;
    max-width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


const HeaderMenu = styled.section`
    width: 160rem;
    height: 100%;
    max-width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NotificationIcon = styled(Icon).attrs({type: "bell"})`
    &:before {
        color: #3A94FC;
        font-size: 17px;
    }
`;
const UserName = styled(Icon).attrs({type: "bell"})`
    color: #333333;
`;
const UserRole = styled(Icon).attrs({type: "bell"})`
   color: #c6c6c6;
`;

export const Logo = styled.img`
    margin: 2rem 0;
    width: 4rem;
`;
const logo = require("../../logo2.png");

const HeaderImpl = withRouter((props: any) => {
    const path = _.startCase(props.location.pathname.slice(1));

    return <HeaderContent>
        <Title>{path}</Title>

        <HeaderMenu>
            <NotificationIcon/>
            <UserName>{props.profile.name}</UserName>
            <UserRole>{props.profile.role}</UserRole>
            <Logo src={logo}/>
        </HeaderMenu>

    </HeaderContent>;
});


export const Header = connect(
    ({common}) => ({...common}), {...Actions}
)(HeaderImpl);