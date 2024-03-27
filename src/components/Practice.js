import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Picker} from 'react-native';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Title', // Initial value for Picker
    };
    this.onValueChange = this.onValueChange.bind(this); // Binding the method to the component instance
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    const {selectedLanguage} = this.state; // Destructure selectedLanguage from state
    return (
      <View>
        <Text>Contact Page</Text>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange}>
          <Picker.Item label="Title" value="Title" />
          <Picker.Item label="Mr" value="Mr" />
          <Picker.Item label="Mrs" value="Mrs" />
        </Picker>
      </View>
    );
  }
}

export default Contact;