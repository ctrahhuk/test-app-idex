import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router";
import Sidebar from "react-sidebar";
import "./App.scss";
import { ProfilePage } from "./profile-page/containers/ProfilePage";
import { HelpPage } from "./help-page/containers/HelpPage";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { Header } from "./common/containers/Header";
import { Footer } from "./common/components/Footer";
import { withNamespaces } from "react-i18next";

const logo = require("./app_logo.png");
export const SidebarContent = styled.aside`
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 16rem;
    height: 100%
    
`;

export const Logo = styled.img`
    margin: 2rem 0;
    width: 4rem;
`;

export const Menu = styled.nav`
    display: flex;
    flex-direction: column;
      width: 100%;
`;


export const SidebarButton = styled.button`
    position: absolute;
    top: calc(50% - 1.5rem);
    background-color: #333333;
    border: none;

    font-weight: bold;
    margin-left: -20px;
    height: 3rem;
    width: 2rem;
    border-radius: 20px ;
    cursor: pointer;
    
    &::after {
    content: "<";
        color: white;
            margin-right: -7px;
    }
`;


export const MenuOption = styled(NavLink)`
    box-sizing: border-box;
    height: 2rem;
    width: 100%;
    
    margin-bottom: .2rem;
    opacity: 0.55;
    font-size: 17px;
    color: white;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    
  &.selected {
    cursor: pointer;
    background-color: #484848;
    border-right: 4px solid #2D8DFC;

    opacity: 1;

    :hover {
      border-right: 4px solid #2D8DFC;
      opacity: 0.8
    }
  }

  :hover {
    cursor: pointer;

          border-right: 4px solid #2D8DFC;

    opacity: 0.8
  }
`;

class AppWithoutRouter extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true
        };

    }

    public render() {

        return <>
            <Sidebar
                sidebar={this.renderSidebarContent()}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarOpen}
                touch={true}
                shadow={false}
                onSetOpen={this.toggleSideBar}
                styles={{sidebar: {background: "white"}}}>
                <SidebarButton onClick={this.toggleSideBar}>{"<"}</SidebarButton>
                <Header/>
                <Switch>
                    <Route path="/help" exact={true} component={HelpPage}/>
                    <Route path="/profile" component={ProfilePage} exact={true}/>
                    <Route exact path="/" render={() => (<Redirect to="/profile"/>)}/>
                </Switch>
                <Footer/>
            </Sidebar>

        </>;
    }

    private renderSidebarContent = () => {
        const {t} = this.props;
        return <SidebarContent>
            <Logo src={logo}/>
            <Menu>
                <MenuOption label="Profile" to="/profile" activeClassName="selected">{t("Profile")}</MenuOption>
                <MenuOption label="Help" to="/help" activeClassName="selected">{t("Help")}</MenuOption>
            </Menu>
        </SidebarContent>;

    };


    private toggleSideBar = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen});
    };
}

const App = withRouter(AppWithoutRouter);

export default withNamespaces()(App as any);
