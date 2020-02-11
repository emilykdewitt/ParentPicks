import React from 'react';
import { Container, Row, Col, ButtonGroup, Button, Input } from 'reactstrap';

import userFeedbackData from '../../DataRequests/userFeedbackData';
import categoriesData from '../../DataRequests/categoriesData';
import usersData from '../../DataRequests/usersData';

import UserPickCard from '../UserPickCard/UserPickCard';

const defaultUser = {
  id: '',
  dateCreated: '',
  firebaseKey: '',
  firstName: '',
  lastName: '',
  location: '',
  email: '',
  bio: '',
}

class UserPicks extends React.Component {
  state = {
    userPicks: [],
    filteredPicks: [],
    categories: [],
    userId: '',
    user: defaultUser,
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ userId: id })
    userFeedbackData.getUserFeedbacksForUser(id)
      .then(userPicks => this.setState({ userPicks, filteredPicks: userPicks }))
      .catch(err => console.error('no feedback for you', err));
    categoriesData.getAllCategories().then(data => {
      let allCategories = [...data];
      this.setState({ categories: allCategories });
    });
    usersData.getUserById(id)
    .then(userResult => this.setState({ user: userResult }))
    .catch(err => console.error('could not get user', err));
  }

  getUserPicks = () => {
    const userId = this.state.userId;
    userFeedbackData.getUserFeedbacksForUser(userId)
      .then(userPicks => this.setState({ userPicks, filteredPicks: userPicks }))
      .catch(err => console.error('no feedback for you', err));
  }

  deleteFeedback = (userFeedbackId) => {
    userFeedbackData.deleteUserFeedback(userFeedbackId)
      .then(() => this.getUserPicks())
      .catch(err => console.error('unable to delete'));
  }

  filterPicksBySearchInput = (e) => {
    e.preventDefault();
    let resultPicks = [];
    const userPicks = this.state.userPicks;
    const searchTerm = e.target.value.toLowerCase();
    userPicks.forEach(pick => {
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
    const { userPicks } = this.state;
    this.setState({ filteredPicks: userPicks });
    const filteredResults = this.state.userPicks.filter(pick => pick.categoryId == buttonCategory);
    this.setState({ filteredPicks: filteredResults });
  }

  makePicks = (results) => {
    return results.map(pick => (
      <UserPickCard
        key={pick.id}
        id={pick.id}
        userId={this.state.userId}
        userFirstName={this.state.user.firstName}
        categoryId={pick.categoryId}
        productImageUrl={pick.productImageUrl}
        name={pick.name}
        brand={pick.brand}
        starRating={pick.starRating}
        review={pick.review}
        className="userPickCard"
        deleteFeedback={this.deleteFeedback}
      />
    ))
  }

  render() {
    const makePickCards = (this.state.filteredPicks.length > 0 ? this.makePicks(this.state.filteredPicks) :
      this.makePicks(this.state.userPicks));

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
                <Button id="showAllBtn" onClick={this.getUserPicks}>Show All</Button>
              </ButtonGroup>
            </Row>
          </Col>
          <Col xs="12" sm="12" m="9" lg="9">
          <h1>{this.state.user.firstName}'s Picks</h1>
            <Row>
              {makePickCards}
            </Row>
          </Col>
        </Row>
      </Container>
    );

  }
}

export default UserPicks;