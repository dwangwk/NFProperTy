import React from "react";
import { Container } from "semantic-ui-react";
import Head from 'next/head'
import Header from "./Header";
import { AccountContextProvider } from "./context/AccountContext";
import { ModalContextProvider } from "./context/ModalContext";

export default props => {
    return (
    <ModalContextProvider>
        <AccountContextProvider>
            <Container>
                <Head>
                <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
                </Head>
                <Header />
                {props.children}
            </Container>
        </AccountContextProvider>
    </ModalContextProvider>
    );
};