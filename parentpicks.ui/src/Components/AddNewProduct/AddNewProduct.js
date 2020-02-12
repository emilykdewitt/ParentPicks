import React from 'react';
import { Alert } from 'reactstrap';

import productsData from '../../DataRequests/productsData';

import './AddNewProduct.scss';

const defaultProduct = {
    categoryId: '',
    name: '',
    brand: '',
    description: '',
    productImageUrl: '',
};

class AddToRegistry extends React.Component {
    state = {
        newProduct: defaultProduct,
        visible: false
    }

    componentDidMount() {
        console.error('Making this a mounted component')
    }

    formFieldStringState = (fieldName, e) => {
        console.error(e.target.value);
        const tempProduct = { ...this.state.newProduct };
        tempProduct[fieldName] = e.target.value;
        this.setState({ newProduct: tempProduct });
    }

    categoryIdChange = e => {
        const tempProduct = { ...this.state.newProduct };
        const fieldName = "categoryId"
        tempProduct[fieldName] = parseInt(e.target.value);
        this.setState({ newProduct: tempProduct });
    }

    nameChange = e => this.formFieldStringState('name', e);

    brandChange = e => this.formFieldStringState('brand', e);

    descriptionChange = e => this.formFieldStringState('description', e);

    productImageUrlChange = e => this.formFieldStringState('productImageUrl', e);

    formSubmit = (e) => {
        e.preventDefault();
        const saveMe = { ...this.state.newProduct };
        console.error(saveMe);
        productsData.addProduct(saveMe)
            .then(() => console.error('Product added!'))
            .catch(err => console.error('new product not added', err))
        .then(() => this.props.history.push('/products'));
    }

    onShowAlert = () => {
        this.setState({ visible: true }, () => {
            window.setTimeout(() => {
                this.setState({ visible: false })
            }, 2000)
        });
    }

    render() {
        const { newProduct } = this.state;

        return (
            <div className="newProduct">
                <form className="addProductForm" onSubmit={this.formSubmit}>
                <p className="addProductTitle">Add Item to Registry</p>
                    <div className="form-group">
                        <label htmlFor="categoryMenu">Select Category</label>
                        <select className="form-control" id="categoryMenu" onChange={this.categoryIdChange}>
                            <option value="1">Strollers</option>
                            <option value="2">Car Seats</option>
                            <option value="3">Gear and Travel</option>
                            <option value="4">Furniture</option>
                            <option value="5">Bedding and Decor</option>
                            <option value="6">Nursing and Feeding</option>
                            <option value="7">Bath and Potty</option>
                            <option value="8">Health and Safety</option>
                            <option value="9">Toys and Learning</option>
                            <option value="10">Clothing and Accessories</option>
                        </select>
                    </div>
                    <div className="productNameInput">
                        <div className="productNameLabelContainer">
                            <label htmlFor="name" >Product Name</label>
                        </div>
                        <div className="form-group nameInputGroup">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Product name"
                                value={newProduct.name}
                                onChange={this.nameChange}
                            />
                        </div>
                    </div>
                    <div className="brandInput">
                        <div className="brandLabelContainer">
                            <label htmlFor="brand" >Brand</label>
                        </div>
                        <div className="form-group nameInputGroup">
                            <input
                                type="text"
                                className="form-control"
                                id="brand"
                                placeholder="Product brand"
                                value={newProduct.brand}
                                onChange={this.brandChange}
                            />
                        </div>
                    </div>
                    <div className="descriptionInput">
                        <div className="descriptionLabelContainer">
                            <label htmlFor="description">Product Description</label>
                        </div>
                        <div className="form-group nameInputGroup">
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Product brand"
                                value={newProduct.description}
                                onChange={this.descriptionChange}
                            />
                        </div>
                    </div>
                    <div className="productImageUrlInput">
                        <div className="productImageUrlLabelContainer">
                            <label htmlFor="productImageUrl">Product Image URL</label>
                        </div>
                        <div className="form-group nameInputGroup">
                            <input
                                type="text"
                                className="form-control"
                                id="productImageUrl"
                                placeholder="Product image URL"
                                value={newProduct.productImageUrl}
                                onChange={this.productImageUrlChange}
                            />
                        </div>
                    </div>
                    <div className="saveProductBtnContainer">
                        <button
                            type="submit"
                            onClick={() => { this.onShowAlert() }}
                            className="btn btn-info saveProductBtn"
                        >
                            Save Product
                        </button>
                    </div>
                </form>
                <Alert color="success" isOpen={this.state.visible} >
                    Product added!
                </Alert>
            </div>
        )
    }
}

export default AddToRegistry;