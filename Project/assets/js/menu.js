import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Menu extends Component{
	constructor(props) {
    super(props);
    this.state = {open: false};
  }
  render() {
    return (
      <div>

        <Drawer>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}