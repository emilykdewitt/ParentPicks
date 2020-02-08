import React from 'react';
import { Alert } from 'reactstrap';

import userRegistryProductData from '../../DataRequests/userRegistryProductData';

const defaultRegProduct = {
    userId: '',
    productId: '',
    quantityNeeded: '',
    itemsInRegistry: []
};

class AddToRegistry extends React.Component {
    state = {
        newRegProduct: defaultRegProduct,
        visible : false
    }

    formFieldStringState = (fieldName, e) => {
        const tempRegProduct = { ...this.state.newRegProduct };
        tempRegProduct[fieldName] = e.target.value;
        this.setState({ newRegProduct: tempRegProduct });
    }

    quantityChange = e => this.formFieldStringState('quantityNeeded', e);

    formSubmit = (e) => {
        e.preventDefault();
        const checkIfInReg = this.props.checkIfInRegistry;
        if (checkIfInReg(this.props.productId)) {
            console.error('Item not added to registry');
        } else {
            const saveMe = { ...this.state.newRegProduct };
            saveMe.userId = sessionStorage.getItem('userId');
            saveMe.productId = this.props.productId;
            userRegistryProductData.addProductToRegistry(saveMe)
                .then(() => console.error('Success!'))
                .catch(err => console.error('unable to save', err));
        }
    }

    onShowAlert = ()=>{
        this.setState({visible:true},()=>{
          window.setTimeout(()=>{
            this.setState({visible:false})
          },2000)
        });
      }

    render() {
        const { newRegProduct } = this.state;

        return (
            <div className="newUserFeedback">
                <h3 className="addUserFeedbackComponentTitle">Add Item to Registry</h3>
                <form className="new-activity-form" onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <label htmlFor="quantityNeeded">Quantity Needed</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantityNeeded"
                            placeholder="0"
                            value={newRegProduct.quantityNeeded}
                            onChange={this.quantityChange}
                        />
                    </div>
                    <button 
                        type="submit" 
                        onClick={()=>{this.onShowAlert()}} 
                        className="btn saveNewRegProduct"
                    >
                        Save Product To Registry
                    </button>
                </form>
                <Alert color="success" isOpen={this.state.visible} >
                    Product added to registry!
                </Alert>
            </div>
        )
    }
}

export default AddToRegistry;