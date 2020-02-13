import React from 'react';
// import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'reactstrap';

import './ProductDetail.scss';

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

    makeUserFeedbackList() {
        console.error(this.state.userFeedbacks)
        if (this.state.userFeedbacks.length > 0) {
            this.state.userFeedbacks.map(singleFeedback => (
                <SingleUserFeedback
                    key={singleFeedback.id}
                    id={singleFeedback.id}
                    userId={singleFeedback.userId}
                    productId={singleFeedback.productId}
                    starRating={singleFeedback.starRating}
                    review={singleFeedback.review}
                />
            ))
        } else {
            return <p><i>This product has not been reviewed yet.</i></p>
        }
    }

    render() {
        const { product } = this.state;
        // const { defaultUserFeedbacks } = this.state;
        // const productsLink = '/products';

        return (
            <Container>
                <div className="SingleProductView">
                    <Container>
                        <Row>
                            <Col>
                                <h3>{product.name}</h3>
                                <h6>Brand: {product.brand}</h6>
                                <img className="img-fluid" src={product.productImageUrl} alt="tralalala" />
                            </Col>
                            <Col>
                                <p className="singleProductPageDescription"><b>Description: </b>{product.description}</p>
                                <hr />
                                <AddUserFeedback
                                    key={product.id}
                                    userId={this.state.currentUserId}
                                    productId={product.id}
                                />
                                <hr />
                                <AddToRegistry
                                    userId={this.state.currentUserId}
                                    productId={product.id}
                                    checkIfInRegistry={this.checkIfInRegistry}
                                />
                                <hr />
                                <p className="userReviewSectionLabel">All User Reviews</p>
                                {this.makeUserFeedbackList()}
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                            </Col>
                            <Col>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        );
    }
}

export default ProductDetail;