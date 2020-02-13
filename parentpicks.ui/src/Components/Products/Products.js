import React from 'react';
import { Container, Row, Col, ButtonGroup, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import productsData from '../../DataRequests/productsData';
import categoriesData from '../../DataRequests/categoriesData';

import './Products.scss'

import ProductCard from '../../Components/ProductCard/ProductCard';

class Products extends React.Component {
    state = {
        products: [],
        filteredProducts: [],
        categories: []
    }

    componentDidMount() {
        productsData.getProducts()
            .then(products => this.setState({ products, filteredProducts: products }))
            .catch(err => console.error('no products for you', err));
        categoriesData.getAllCategories().then(data => {
            let allCategories = [...data];
            this.setState({ categories: allCategories });
        });
    }

    getProducts = () => {
        productsData.getProducts()
            .then(products => this.setState({ products, filteredProducts: products }))
            .catch(err => console.error('no products for you', err));
    }

    filterProductsBySearchInput = (e) => {
        e.preventDefault();
        let resultProducts = [];
        const products = this.state.products;
        const searchTerm = e.target.value.toLowerCase();
        products.forEach(product => {
          const desc = product.name.toLowerCase();
          if (desc.includes(searchTerm) && searchTerm !== "") {
            resultProducts.push(product);
          }
          this.setState({ filteredProducts: resultProducts });
          this.makeProducts(this.state.filteredProducts);
        });
    }

    filterProductsByCategory = (e) => {
        e.preventDefault();
        const buttonCategory = e.target.id;
        const { products } = this.state;
        this.setState({ filteredProducts: products });
        const filteredResults = this.state.products.filter(product => product.categoryId == buttonCategory);
        this.setState({ filteredProducts: filteredResults });
    }

    makeProducts = (results) => {
        return results.map(product => (
            <ProductCard
                key={product.id}
                id={product.id}
                categoryId={product.categoryId}
                name={product.name}
                brand={product.brand}
                description={product.description}
                productImageUrl={product.productImageUrl}
            />
        ))
    }

    render() {
        const makeProductCards = (this.state.filteredProducts.length > 0 ? this.makeProducts(this.state.filteredProducts) : 
            this.makeProducts(this.state.products));

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
            <Container className="productsFullPage">
              <Row>
                <Col xs="12" s="12" m="3" lg="3" align="center" id="searchAndCategoryContainer">
                  <Row>
                    <form className="form-inline my-2 my-lg-0" id="searchIconAndInput">
                      <Input id="productSearchInput" className="productSearchInput form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search products" onChange={this.filterProductsBySearchInput} />
                    </form>
                  </Row>
                  <Row>
                    <ButtonGroup vertical id="categoryBtnContainer">
                      {makeCategories}
                      <Button id="showAllBtn" onClick={this.getProducts}>Show All</Button>
                    </ButtonGroup>
                  </Row>
                </Col>
                <Col xs="12" sm="12" m="9" lg="9">
                  <h2 className="productsPageTitle">Browse ParentPicks</h2>
                  <Link to="/add-new-product" className="btn btn-info addNewProductBtn">Add New Product</Link>
                  <Row className="productCardsContainer">
                    {makeProductCards}
                  </Row>
                </Col>
              </Row>
            </Container>
          )
    }
}

export default Products;