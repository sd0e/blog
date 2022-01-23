import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import InfoCard from './components/ui/InfoCard';
import Layout from './components/layout/Layout';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Article = lazy(() => import('./pages/Article'));
const Out = lazy(() => import('./pages/Out'));
const Category = lazy(() => import('./pages/Category'));

function App() {
    return (
        <BrowserRouter>
            <Layout>
                    <Routes>
                        <Route path="/" element={
                            <Suspense fallback={ <InfoCard Loading /> }>
                                <Home />
                            </Suspense>
                        } />
                        <Route path="/about" element={
                            <Suspense fallback={ <InfoCard Loading /> }>
                                <About />
                            </Suspense>
                        } />
                        <Route path="/article/*" element={
                            <Suspense fallback={ <InfoCard Loading /> }>
                                <Article />
                            </Suspense>
                        } />
                        <Route path="/out/*" element={
                            <Suspense fallback={ <InfoCard Loading /> }>
                                <Out />
                            </Suspense>
                        } />
                        <Route path="/category/*" element={
                            <Suspense fallback={ <InfoCard Loading /> }>
                                <Category />
                            </Suspense>
                        } />
                        <Route path="*" element={
                            <Suspense fallback={ <InfoCard Loading /> }>
                                <Home />
                            </Suspense>
                        } />
                    </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;