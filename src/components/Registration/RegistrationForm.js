import React from "react";
import Joi from "joi-browser";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Form,
  CardHeader,
} from "reactstrap";
import { NotificationManager } from "react-notifications";
import { toast } from "react-toastify";
import Select from "../../components/common/select";
import FormFunc from "../../components/common/formfunc";
import {
  saveRegistration
} from "./RegistrationService";
import { getCustomers } from "./RegistrationService";
import { getItems } from "./RegistrationService";
import auth from "../Pages/authService";
import './ValidationForms.css'


class RegistrationForm extends FormFunc {
  state = {
    data: {
      rate:0,
      quantity:0,
      billed:0,
      green:0,
      yellow:0,
      red:0,
      customer:"",
      item:""
    },
    items: [],
    customers: [],
    itemID: 0,
    customerId: {},
    errors: {},
  };

  schema = {
    item: Joi.string()
      .required()
      .label("Item Name"),
    customer:  Joi.string()
      .label("Customer"),
    rate: Joi.number()
      .required()
      .label("Rate"),
      quantity: Joi.number()
      .required()
      .label("Quantity"),
    billed: Joi.number()
      .required()
      .label("Billed"),
    green: Joi.number()
      .required()
      .label("Green"),
    yellow: Joi.number()
      .required()
      .label("Yellow"),
      red: Joi.number()
      .required()
      .label("Red"),
      saledate:Joi.string()
      .required()
      .label("Red"),
  };

  async populateCustomers() {
    const { data } = await getCustomers();
    
    const customers = data.result.map(item => ({
      _id: item.CustomerId,
      name: item.CustomerName
    }));
    this.setState({ customers });
  }

  async populateItems() {
    const { data } = await getItems();
    const items = data.result.map(item => ({
        _id: item.ItemID,
      name: item.ItemName
      }));
    this.setState({ items });
  }

  
  async componentDidMount() {
    await this.populateCustomers();
    await this.populateItems ();
  }

  mapToViewModel(data) {
    return {
      item: data.itemid._id,
      customer: data.customer._id,
      quantity: data.quantity,
      rate: data.rate,
      billed: data.billed,
      green: data.green,
      yellow: data.yellow,
      red: data.red,
      saledate:data.saledate
    };
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    await saveRegistration(data,auth.getUserId());
    // toast.success("Registration Saved Successfully!!!");  
    NotificationManager.success("Registration Saved Successfully!!!");  
    this.props.refreshDashboard(this.state.data.saledate);
  };

  handleCancel(event) {
    event.preventDefault();
    this.props.toggle();
  }
  validateFormProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleUnitChange = async ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateFormProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });

  };

  render() {
    const {  data, customers, errors, items } = this.state;
    const {customerId} = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12} style={{ flexBasis: "auto" }}>
            <Card>
              <CardHeader>
                <i className={"icon-note" } />
                <strong>Registration</strong> Form
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    {!customerId && 
                      <FormGroup className="col-md-6">
                        <Select
                          name="customer"
                          value={data["customer"]}
                          label="Customer"
                          options={customers}
                          onChange={this.handleUnitChange}
                          error={errors["customer"]}
                        />
                      </FormGroup>
                    }
                    <FormGroup className="col-md-6">
                      <Select
                        name="item"
                        value={data["item"]}
                        label="Items"
                        options={items}
                        onChange={this.handleUnitChange}
                        error={errors["item"]}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Rate</Label>
                      {this.renderInput("rate", "Enter Rate",'Number')}
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Quantity</Label>
                      {this.renderInput("quantity", "Enter Quantity",'Number')}
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Billed</Label>
                      {this.renderInput("billed", "Enter Billed",'Number')}
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Green</Label>
                      {this.renderInput(
                        "green",
                        "Enter Green",
                        "Number"
                      )}
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Yellow</Label>
                      {this.renderInput(
                        "yellow",
                        "Enter Yellow",
                        "Number"
                      )}
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Red</Label>
                      {this.renderInput(
                        "red",
                        "Enter Red",
                        "Number"
                      )}
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Sale Date</Label>
                      {this.renderInput(
                        "saledate",
                        "Enter Sale Date",
                        "date"
                      )}
                    </FormGroup>                  
                  </div>
                  <div className="text-center">
                    {this.renderButton( "Save")}{" "}
                    <button
                      onClick={this.handleCancel.bind(this)}
                      className="btn btn-primary btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegistrationForm;
