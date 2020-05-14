import * as React from "react";
import styled from "styled-components";

import { withRouter } from "react-router";

import * as _ from "lodash";
import { Icon } from "./icon/Icon";


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

export const Header = withRouter(({location}) => {
    const path = _.startCase(location.pathname.slice(1));

    return <HeaderContent>
        <Title>{path}</Title>

        <HeaderMenu>
            <NotificationIcon/>

            
        </HeaderMenu>

    </HeaderContent>;
});

