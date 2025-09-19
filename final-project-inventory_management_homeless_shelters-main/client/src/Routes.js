/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import urls from './constants/routes.json';
import Login from './containers/Login';
import Register from './containers/Register';
import ShelterList from './containers/Admin/ShelterList';
import ShelterForm from './containers/Admin/ShelterForm';
import InventoryList from './containers/Admin/InventoryList';
import InventoryForm from './containers/Admin/InventoryForm';
import Home from './containers/Home';
import DistributionList from './containers/Admin/DistributionList';
import MakeDistribution from './containers/Admin/MakeDistribution';

function AppRouter() {
    return (
        <Routes>
            <Route exact path={urls?.LOGIN} element={<Login />} />
            <Route exact path={urls?.REGISTER} element={<Register />} />
            {/* <Route exact path={urls?.USERS} element={<About />} /> */}

            <Route exact path={urls?.SHELTERS} element={<ShelterList />} />
            <Route exact path={urls?.SHELTERS_ADD} element={<ShelterForm />} />
            <Route exact path={urls?.SHELTERS_EDIT} element={<ShelterForm />} />

            <Route exact path={urls?.INVENTORY} element={<InventoryList />} />
            <Route exact path={urls?.INVENTORY_ADD} element={<InventoryForm />} />
            <Route exact path={urls?.INVENTORY_EDIT} element={<InventoryForm />} />
            <Route exact path={urls?.HOME} element={<Home />} />
            <Route exact path={urls?.DISTRIBUTIONS} element={<DistributionList />} />
            <Route exact path={urls?.MAKE_DISTRIBUTIONS} element={<MakeDistribution/>} />
        </Routes>
    )
}

AppRouter.propTypes = {};

export default AppRouter;
