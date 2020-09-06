import React, { Component } from "react";
import style from "./contactForm.module.css";
export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddContact(this.state.name, this.state.number);
    this.setState({ name: "" });
    this.setState({ number: "" });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form className={style.contactForm} onSubmit={this.handleSubmit}>
        <label>
          <p className={style.input}>Name</p>
          <input
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
            required
          />
        </label>
        <p className={style.input}>Number</p>
        <input
          type="tel"
          value={number}
          onChange={this.handleChange}
          name="number"
          required
        />
        <br />
        <button type="submit" className={style.submit_form}>
          Add contact
        </button>
      </form>
    );
  }
}
