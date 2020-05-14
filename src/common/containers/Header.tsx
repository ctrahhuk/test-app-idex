import * as React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as _ from "lodash";
import * as Actions from "../actions/commonActions";
import { Icon } from "../components/icon/Icon";
import { Trans } from 'react-i18next';


const HeaderContent = styled.header`
    width: 100%;
    height: 6rem;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


const Title = styled.h1`
    align-self: flex-end;
      margin-left: 2rem;
        margin-bottom: 1rem;
`;


const HeaderMenu = styled.section`
    width: 15rem;
    display: flex;
    margin-right: 2rem;
    margin-top: 1rem;
    align-items: center;
    align-self: flex-start;
`;

const NotificationIcon = styled(Icon).attrs({type: "bell"})`
    &:before {
        color: #3A94FC;
        font-size: 17px;
    }
    flex:1;


`;
const UserInfo = styled.h1`
    color: #333333;
    margin: 0 1rem;
`;

const UserName = styled.div`
    color: #333333;
    font-size: 16px;
`;

const UserRole = styled.span`
    color: #c6c6c6;
    font-size: 14px;
    font-weight: normal;
`;

export const Logo = styled.img`

    width: 3rem;
    height: 3rem;
`;
const logo = require("../../logo2.png");

const HeaderImpl = withRouter((props: any) => {
    const path = _.startCase(props.location.pathname.slice(1));

    return <HeaderContent>
        <Title><Trans>{path}</Trans></Title>

        <HeaderMenu>
            <NotificationIcon/>
            <UserInfo>
                <UserName>{props.profile.userAccountInfo.fullName}</UserName>
                <UserRole><Trans>{props.profile.userAccountInfo.authorities}</Trans></UserRole>
            </UserInfo>

            <Logo src={logo}/>
        </HeaderMenu>

    </HeaderContent>;
});


export const Header = connect(
    ({common}) => ({...common}), {...Actions}
)(HeaderImpl);