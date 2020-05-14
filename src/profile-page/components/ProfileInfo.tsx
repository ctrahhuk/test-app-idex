import * as React from "react";
import styled, { css } from "styled-components";
import i18n from '../../i18n';
import { Trans } from 'react-i18next';

const logo = require("../../logo2.png");


export const Panel = styled.section`
    background-color: white;
    border: 1px solid #c0c0c0;
    border-radius: 4px;
    display: flex;
    width: 50%;
    flex-direction:column;
    margin: 2rem;
    padding: 1rem;
`;

export const Logo = styled.img`
  width: 5rem;
  height: auto;
  align-self: center;
  margin: 0 auto;
`;


export const Label = styled.div`
    color: #A1AEB7;
    font-weight: 700;
    font-size: 14px;
`;
export const Value = styled.div`
    color:  #261c17;
    font-size: 15px;
    margin-bottom: 1rem;
`;

export const UserData = styled.section`
    color:  #4C3933;
    font-size: 15px;
    width: 100%;
`;


const ProfileActionSection = styled.section`
    border-top: 1px solid #c0c0c0;
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.justifyContent};
    height: 3rem;
`;

const LangSelector = styled.select`
    width: 5rem;
    margin-left: 2rem;
`;
const Checkbox = styled.input.attrs({type: "checkbox"})`

`;
const CheckboxLabel = styled.label`
    margin-left: 1rem;
        font-size: 14px;
`;


const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: ${(props) => props.margin || 0};
  padding: 0;
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  flex: ${(props) => props.flex};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  z-index: 10;
  &:focus {
    outline: none;
  }

  &:hover, span::before {
    opacity: 0.7;
  }
`;


export class ProfileInfo extends React.PureComponent<any, any> {

    constructor(props: any) {
        super(props);
        this.state={lang: "en"};
    }

    public render() {
        const {profile, t} = this.props;
        return <Panel>
            <Logo src={logo}/>
            <UserData>
                <Label><Trans>Full name</Trans></Label>
                <Value>{profile.userAccountInfo.fullName}</Value>
                <Label><Trans>Email</Trans></Label>
                <Value>{profile.userAccountInfo.email}</Value>
            </UserData>
            <ProfileActionSection>
                <LinkButton color="#2D8DFC" fontWeight="700" fontSize="15px"><Trans>Change password</Trans> </LinkButton>
            </ProfileActionSection>
            <ProfileActionSection>
                <LinkButton color="#2D8DFC" fontWeight="700" fontSize="15px"><Trans>Select App Language</Trans></LinkButton>
                <LangSelector value={this.state.lang} onChange={this.handleLangChange}>
                    <option value="en">Eng</option>
                    <option value="ru">Рус</option>
                </LangSelector>
            </ProfileActionSection>
            <ProfileActionSection justifyContent={"space-between"}>
                <LinkButton color="#2D8DFC" fontWeight="700" fontSize="15px" flex="1"><Trans>Logout</Trans></LinkButton>
                <Checkbox id="logout-all-devices"/>
                <CheckboxLabel for="logout-all-devices"><Trans>Logout on all devices</Trans></CheckboxLabel>
            </ProfileActionSection>

        </Panel>
            ;
    }

    private handleLangChange = (event) => {
        i18n.changeLanguage( event.target.value);
        this.setState({lang: event.target.value});
    }
}

