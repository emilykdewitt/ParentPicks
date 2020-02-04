import React from 'react';
// import { Link } from 'react-router-dom';

import productsData from '../../DataRequests/productsData';
import userFeedbackData from '../../DataRequests/userFeedbackData';
import { Col, Row, Container } from 'reactstrap';
import SingleUserFeedback from '../SingleUserFeedback/SingleUserFeedback';
const defaultProduct = {
    categoryId: '',
    name: '',
    brand: '',
    description: '',
    productImageUrl: '',
};

class ProductDetail extends React.Component {
    state = {
        product: '',
        userFeedbacks: [],
    }

    componentDidMount() {
        const productId = this.props.match.params.id;
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
    }

    render() {
        const { product } = this.state;
        // const { defaultUserFeedbacks } = this.state;
        // const productsLink = '/products';

        const makeUserFeedbackList = () => {
            const feedbackList = this.state.userFeedbacks;
            return feedbackList.map(singleFeedback => (
                <SingleUserFeedback
                    key={singleFeedback.id}
                    id={singleFeedback.id}
                    userId={singleFeedback.userId}
                    productId={singleFeedback.productId}
                    starRating={singleFeedback.starRating}
                    review={singleFeedback.review}
                />
            ))
        }

        return (
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
                                <p>This is where rating and review input fields will go</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>All User Feedback</h3>
                                {makeUserFeedbackList}
                            </Col>
                            <Col>
                                <p>This is where the input and button to add to registry will go</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
        );
    }
}

export default ProductDetail;