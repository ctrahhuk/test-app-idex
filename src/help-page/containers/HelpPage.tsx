import * as React from "react";
import { connect } from 'react-redux';
import * as Actions from "../actions/helpPageActions";
import styled from "styled-components";
import { Trans } from 'react-i18next';


export const Page = styled.section`
    display: flex;
    justify-content: center;
`;

const Panel = styled.section`
    background-color: white;
    border: 1px solid #c0c0c0;
    border-radius: 4px;
    display: flex;
    width: 80%;
    flex-direction:column;
    align-items: center;
    margin: 1rem;
    padding: 1rem;
`;


const Title = styled.h1`
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #c0c0c0;
margin: 0;
    font-size: 27px;
    font-weight: 400;
padding-bottom: 1rem;
`;

const Label = styled.div`
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    color:  #474747;
    font-size: 15px;
    font-weight: 400;
padding: 1rem 0;
`;

const TextArea = styled.textarea`
    width: 70%;
    display:flex;
    align-items: center;
    justify-content: center;
    color:  #474747;
    font-size: 15px;
    padding: 0 1rem;
resize: vertical;
max-height: 20rem; 
margin-bottom: 1rem;
`;

const Button = styled.button`
   background: #2D8DFC;
   color: white;
   cursor: pointer;
   border-radius: 6px;
   &:hover {opacity: 0.8;}
   height: 2.4rem;
   width: 6rem;
   
`;


class HelpPageImpl extends React.PureComponent<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return <Page>
            <Panel>
                <Title><Trans>Contact us</Trans></Title>
                <Label><Trans>Let us know how we can help</Trans></Label>
                <TextArea />
                <Button><Trans>Send</Trans></Button>

            </Panel>
        </Page>;
    }

}


export const HelpPage = connect(
    ({helpPage}) => ({...helpPage}), {...Actions}
)(HelpPageImpl);