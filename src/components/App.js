import React, { Component } from "react";
import Section from "./Sections/Sections";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import { v4 as uuidv4 } from "uuid";

export default class App extends Component {
  state = {
    contacts: [
      { id: uuidv4(), name: "Rosie Simpson", number: "459-12-56" },
      { id: uuidv4(), name: "Hermione Kline", number: "443-89-12" },
      { id: uuidv4(), name: "Eden Clements", number: "645-17-79" },
      { id: uuidv4(), name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    const nameIsOriginal = this.state.contacts
      .map((contact) => contact.name)
      .includes(name);

    this.setState((prevState) => {
      if (nameIsOriginal) {
        alert(`Имя ${name} уже существует!`);
      } else {
        return {
          contacts: [...prevState.contacts, contact],
        };
      }
    });
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  componentDidMount() {
    console.log("componentDidMount");
    this.getFromlocalStorage();
  }

  getFromlocalStorage() {
    const persistedTask = localStorage.getItem("contacts");

    if (persistedTask) {
      this.setState({
        contacts: JSON.parse(persistedTask),
      });
    }
  }

  componentDidUpdate(prevState) {
    console.log("componentDidUpdate");
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { filter } = this.state;
    console.log("render");
    const visibleContacts = this.getVisibleContacts();

    return (
      <Section title="Phonebook">
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.changeFilter} />
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </Section>
    );
  }
}
