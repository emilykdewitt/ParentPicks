import React from 'react';
import { Container, Row, Col, ButtonGroup, Button, Input } from 'reactstrap';

import userFeedbackData from '../../DataRequests/userFeedbackData';
import categoriesData from '../../DataRequests/categoriesData';
import MyPickCard from '../MyPickCard/MyPickCard';

class MyPicks extends React.Component {
    state = {
        myPicks: [],
        filteredPicks: [],
        categories: []
    }

    componentDidMount() {
        const userId = sessionStorage.getItem('userId');
        userFeedbackData.getUserFeedbacksForUser(userId)
            .then(myPicks => this.setState({ myPicks, filteredPicks: myPicks }))
            .catch(err => console.error('no feedback for you', err));
        categoriesData.getAllCategories().then(data => {
            let allCategories = [...data];
            this.setState({ categories: allCategories });
        });
    }

    getMyPicks = () => {
        const userId = sessionStorage.getItem('userId');
        userFeedbackData.getUserFeedbacksForUser(userId)
            .then(myPicks => this.setState({ myPicks, filteredPicks: myPicks }))
            .catch(err => console.error('no feedback for you', err));
    }

    deleteFeedback = (userFeedbackId) => {
      userFeedbackData.deleteUserFeedback(userFeedbackId)
        .then(() => this.getMyPicks())
        .catch(err => console.error('unable to delete'));
    }

    filterPicksBySearchInput = (e) => {
        e.preventDefault();
        let resultPicks = [];
        const myPicks = this.state.myPicks;
        const searchTerm = e.target.value.toLowerCase();
        myPicks.forEach(pick => {
          const desc = pick.name.toLowerCase();
          if (desc.includes(searchTerm) && searchTerm !== "") {
            resultPicks.push(pick);
          }
          this.setState({ filteredPicks: resultPicks });
          this.makePicks(this.state.filteredPicks);
        });
    }

    filterPicksByCategory = (e) => {
        e.preventDefault();
        const buttonCategory = e.target.id;
        const { myPicks } = this.state;
        this.setState({ filteredPicks: myPicks });
        const filteredResults = this.state.myPicks.filter(pick => pick.categoryId == buttonCategory);
        this.setState({ filteredPicks: filteredResults });
    }

    makePicks = (results) => {
        return results.map(pick => (
            <MyPickCard
                key={pick.id}
                id={pick.id}
                categoryId={pick.categoryId}
                productImageUrl={pick.productImageUrl}
                name={pick.name}
                brand={pick.brand}
                starRating={pick.starRating}
                review={pick.review}
                className="myPickCard"
                deleteFeedback={this.deleteFeedback}
            />
        ))
    }

    render() {
        const makePickCards = (this.state.filteredPicks.length > 0 ? this.makePicks(this.state.filteredPicks) : 
            this.makePicks(this.state.myPicks));

        const makeCategories = this.state.categories.map(category => (
            <Button
                key={category.id}
                id={category.id}
                className="categoryButton"
                onClick={this.filterProductsByCategory}
            >
                {category.categoryName}
            </Button>
            )
        )
        
        return (
            <Container>
              <Row>
                <Col xs="12" s="12" m="3" lg="3" align="center" id="searchAndCategoryContainer">
                  <Row>
                    <form className="form-inline my-2 my-lg-0" id="searchIconAndInput">
                      <Input id="productSearchInput" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.filterPicksBySearchInput} />
                    </form>
                  </Row>
                  <Row>
                    <ButtonGroup vertical id="categoryBtnContainer">
                      {makeCategories}
                      <Button id="showAllBtn" onClick={this.getMyPicks}>Show All</Button>
                    </ButtonGroup>
                  </Row>
                </Col>
                <Col xs="12" sm="12" m="9" lg="9">
                  <h1>My Product Reviews</h1>
                  <Row>
                    {makePickCards}
                  </Row>
                </Col>
              </Row>
            </Container>
        );

    }
}

export default MyPicks;