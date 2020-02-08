import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import usersData from '../../DataRequests/usersData';

import UserCard from '../../Components/UserCard/UserCard';

class CommunityPage extends React.Component {
    state = {
        users: [],
    }

    componentDidMount() {
        usersData.getUsers()
            .then(users => this.setState({ users }))
            .catch(err => console.error('no users for you', err));
    }

    getProducts = () => {
        usersData.getUsers()
            .then(users => this.setState({ users }))
            .catch(err => console.error('no users for you', err));
    }

    // filterProductsBySearchInput = (e) => {
    //     e.preventDefault();
    //     let resultProducts = [];
    //     const products = this.state.products;
    //     const searchTerm = e.target.value.toLowerCase();
    //     products.forEach(product => {
    //       const desc = product.name.toLowerCase();
    //       if (desc.includes(searchTerm) && searchTerm !== "") {
    //         resultProducts.push(product);
    //       }
    //       this.setState({ filteredProducts: resultProducts });
    //       this.makeProducts(this.state.filteredProducts);
    //     });
    // }

    makeUsers = (users) => {
        return users.map(user => (
            <UserCard
                key={user.id}
                id={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                location={user.location}
                bio={user.bio}
                profilePhotoUrl={user.profilePhotoUrl}
            />
        ))
    }

    render() {
        const makeUserCards = this.makeUsers(this.state.users);

        return (
            <Container>
              <Row>
                <Col xs="12" sm="12" m="9" lg="9">
                  <h1>Users</h1>
                  <Row>
                    {makeUserCards}
                  </Row>
                </Col>
              </Row>
            </Container>
          )
    }
}

export default CommunityPage;