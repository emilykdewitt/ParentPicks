import React from 'react';
// import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'reactstrap';

import productsData from '../../DataRequests/productsData';
import userFeedbackData from '../../DataRequests/userFeedbackData';
import userRegistryProductData from '../../DataRequests/userRegistryProductData';

import SingleUserFeedback from '../SingleUserFeedback/SingleUserFeedback';
import AddUserFeedback from '../AddUserFeedback/AddUserFeedback';
import AddToRegistry from '../AddToRegistry/AddToRegistry';

// const defaultProduct = {
//     categoryId: '',
//     name: '',
//     brand: '',
//     description: '',
//     productImageUrl: '',
// };

class ProductDetail extends React.Component {
    state = {
        product: '',
        userFeedbacks: [],
        currentUserId: '',
        userRegistryProducts: [],
    }

    componentDidMount() {
        const productId = this.props.match.params.id;
        const userId = sessionStorage.getItem('userId');
        this.setState({ currentUser: userId })
        productsData.getSingleProduct(productId)
            .then((productResult) => {
                this.setState({ product: productResult })
            })
            .catch((err) => console.error('no product returned', err));
        userFeedbackData.getProductFeedbackByProductId(productId)
            .then((userFeedbackResults) => {
                this.setState({ userFeedbacks: userFeedbackResults })
            })
            .catch((err) => console.error('no productReviews returned', err));
        userRegistryProductData.getUserRegistryProductsForUser(userId)
            .then(userRegistryProducts => this.setState({ userRegistryProducts }))
            .catch(err => console.error('no registry products for you', err));
    }

    checkIfInRegistry = (productId) => {
        const matchingItems = this.state.userRegistryProducts.filter(product => product.id == productId);
        if (matchingItems.length > 0) {
          alert('This item is already in your registry');
          return true;
        } else return false;
    }

    render() {
        const { product } = this.state;
        // const { defaultUserFeedbacks } = this.state;
        // const productsLink = '/products';

        const makeUserFeedbackList = this.state.userFeedbacks.map(singleFeedback => (
            <SingleUserFeedback
                key={singleFeedback.id}
                id={singleFeedback.id}
                userId={singleFeedback.userId}
                productId={singleFeedback.productId}
                starRating={singleFeedback.starRating}
                review={singleFeedback.review}
            />
        ))

        return (
            <Container>
                <div className="SingleProductView">
                    <h2>Single Product View for {product.name}</h2>
                    <Container>
                        <Row>
                            <Col>
                                <h3>{product.name}</h3>
                                <img className="img-fluid" src={product.productImageUrl} alt="tralalala" />
                                <h6>Brand: {product.brand}</h6>
                                <p>Description: {product.description}</p>
                            </Col>
                            <Col>
                                <AddUserFeedback 
                                    key={product.id}
                                    userId={this.state.currentUserId}
                                    productId={product.id}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>All User Feedback</h3>
                                {makeUserFeedbackList}
                            </Col>
                            <Col>
                                <AddToRegistry 
                                    userId={this.state.currentUserId}
                                    productId={product.id}
                                    checkIfInRegistry={this.checkIfInRegistry}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        );
    }
}

export default ProductDetail;