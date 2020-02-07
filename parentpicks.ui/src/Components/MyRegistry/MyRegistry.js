import React from 'react';
import { Container, Row, Col, ButtonGroup, Button, Input } from 'reactstrap';

import userRegistryProductData from '../../DataRequests/userRegistryProductData';
import categoriesData from '../../DataRequests/categoriesData';

import RegistryProductCard from '../RegistryProductCard/RegistryProductCard';

class MyRegistry extends React.Component {
    state = {
        myRegistryProducts: [],
        filteredRegistryProducts: [],
        categories: []
    }

    componentDidMount() {
        const userId = sessionStorage.getItem('userId');
        userRegistryProductData.getUserRegistryProductsForUser(userId)
            .then(myRegistryProducts => this.setState({ myRegistryProducts, filteredRegistryProducts: myRegistryProducts }))
            .catch(err => console.error('no registry products for you', err));
        categoriesData.getAllCategories().then(data => {
            let allCategories = [...data];
            this.setState({ categories: allCategories });
        });
    }

    getRegistryProducts = () => {
        const userId = sessionStorage.getItem('userId');
        userRegistryProductData.getUserRegistryProductsForUser(userId)
            .then(myRegistryProducts => {
              this.setState({ myRegistryProducts, filteredRegistryProducts: myRegistryProducts })
            })
            .catch(err => console.error('no registry products for you', err));
    }

    deleteRegistryProduct = (userRegProdId) => {
      userRegistryProductData.deleteRegistryProduct(userRegProdId)
        .then(() => this.getRegistryProducts())
        .catch(err => console.error('unable to delete'));
    }

    filterProductsBySearchInput = (e) => {
        e.preventDefault();
        let resultProducts = [];
        const myRegistryProducts = this.state.myRegistryProducts;
        const searchTerm = e.target.value.toLowerCase();
        myRegistryProducts.forEach(product => {
          const desc = product.name.toLowerCase();
          if (desc.includes(searchTerm) && searchTerm !== "") {
            resultProducts.push(product);
          }
          this.setState({ filteredRegistryProducts: resultProducts });
          this.makeRegistryProducts(this.state.filteredRegistryProducts);
        });
    }

    filterProductsByCategory = (e) => {
        e.preventDefault();
        const buttonCategory = e.target.id;
        const { myRegistryProducts } = this.state;
        this.setState({ filteredRegistryProducts: myRegistryProducts});
        const filteredResults = this.state.myRegistryProducts.filter(product => product.categoryId == buttonCategory);
        this.setState({ filteredRegistryProducts: filteredResults });
    }

    makeRegistryProducts = (results) => {
      if (results.length > 0) {
        return results.map(product => (
          <RegistryProductCard
            key={product.id}
            categoryId={product.categoryId}
            // productId={product.id}
            name={product.name}
            brand={product.brand}
            description={product.description}
            productImageUrl={product.productImageUrl}
            quantityNeeded={product.quantityNeeded}
            starRating={product.starRating}
            deleteRegistryProduct={this.deleteRegistryProduct}
            className="registryProductCard"
          />
        ))
      } else {
        return <p>You have not added any products to your registry! Return to the products page to begin adding items.</p>
      };
    }

    render() {
        const makeRegistryItemCards = (this.state.filteredRegistryProducts.length > 0 ? this.makeRegistryProducts(this.state.filteredRegistryProducts) : 
            this.makeRegistryProducts(this.state.myRegistryProducts));

        const makeCategories = this.state.categories.map(category => (
            <Button
              key={category.id}
              id={category.id}
              className="categoryButton"
              onClick={this.filterProductsByCategory}
            >
              {category.categoryName}
            </Button>
          ))

        return (
            <Container>
              <Row>
                <Col xs="12" s="12" m="3" lg="3" align="center" id="searchAndCategoryContainer">
                  <Row>
                    <form className="form-inline my-2 my-lg-0" id="searchIconAndInput">
                      <Input id="productSearchInput" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.filterProductsBySearchInput} />
                    </form>
                  </Row>
                  <Row>
                    <ButtonGroup vertical id="categoryBtnContainer">
                      {makeCategories}
                      <Button id="showAllBtn" onClick={this.getRegistryProducts}>Show All</Button>
                    </ButtonGroup>
                  </Row>
                </Col>
                <Col xs="12" sm="12" m="9" lg="9">
                  <h1>My Registry</h1>
                  <Row>
                    {makeRegistryItemCards}
                  </Row>
                </Col>
              </Row>
            </Container>
        );
    }
}

export default MyRegistry;

