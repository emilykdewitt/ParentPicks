import React from 'react';

import userRegistryProductData from '../../DataRequests/userRegistryProductData';
import categoriesData from '../../DataRequests/categoriesData';

class MyRegistry extends React.Component {
    state = {
        myRegistryProducts: [],
        filteredRegistryProducts: []
    }

    componentDidMount() {
        const userId = sessionStorage.getItem('userId');
        userRegistryProductData.getUserRegistryProductsForUser(1)
            .then(myRegistryProducts => this.setState({ myRegistryProducts, filteredRegistryProducts: myRegistryProducts }))
            .catch(err => console.error('no registry products for you', err));
        categoriesData.getAllCategories().then(data => {
            let allCategories = [...data];
            this.setState({ categories: allCategories });
        });
    }



    render() {
        const displayAllMyRegistryProducts = console.error(this.state.myRegistryProducts);
        const displayCategories = console.error(this.state.categories);

        return (
            <div>
                <h1>My Registry</h1>
                {displayAllMyRegistryProducts}
                {displayCategories}
            </div>
        );
    }
}

export default MyRegistry;
