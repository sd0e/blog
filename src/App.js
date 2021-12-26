import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Article from './pages/Article';
import Out from './pages/Out';
import Category from './pages/Category';
import PageHead from './PageHead';
import GeneratePageTitle from './scripts/GeneratePageTitle';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <PageHead Title={GeneratePageTitle('Home')} />
                    <Home />
                </Route>
                <Route path="/about" exact>
                    <PageHead Title={GeneratePageTitle('About')} />
                    <About />
                </Route>
                <Route path="/article">
                    <Article />
                </Route>
                <Route path="/out">
                    <Out />
                </Route>
                <Route path="/category">
                    <Category />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Layout>
    );
}

export default App;