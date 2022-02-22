import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from '@components/Navigation';
import Drawer from '@components/Drawer';
import WalletModal from '@components/WalletModal';
import KlipQRModal from '@components/KlipQRModal';
import VoteModal from '@components/VoteModal';
import Header from '@components/Header';
import Loading from '@components/Loading';
import 'react-toastify/dist/ReactToastify.css';
import Upload from '../components/UploadImage/index';
import UploadImage from '../components/UploadImage/Upload';

const Home = React.lazy(() => import('@pages/Home'));
const RandomDraw = React.lazy(() => import('@pages/RandomDraw'));
const ProposeMenu = React.lazy(() => import('@pages/ProposeMenu'));
const Vote = React.lazy(() => import('@pages/Vote'));
const User = React.lazy(() => import('@pages/User'));
const Landing = React.lazy(() => import('@pages/Landing'));
const NotFound = React.lazy(() => import('@pages/NotFound'));

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/randomdraw" element={<RandomDraw />} />
          <Route path="/propose" element={<ProposeMenu />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/user" element={<User />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/uploadimage" element={<UploadImage />} />
        </Routes>
      </Suspense>
      <Navigation />
      <Drawer />
      <WalletModal />
      <KlipQRModal />
      <VoteModal />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Router;
