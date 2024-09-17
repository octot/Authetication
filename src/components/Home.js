import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome</h1>
            <div>
                <Link to="/logout">Logout </Link>
            </div>
        </div>
    )
}
export default Home;