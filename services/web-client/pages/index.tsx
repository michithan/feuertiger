import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import Persons from '../components/persons';

const Home = () => (
    <div>
        <Head>
            <title>Feuertiger</title>
            <link rel="icon" href="/favicon.ico" />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
        </Head>
        <Nav />
        <Persons />
    </div>
);

export default Home;
