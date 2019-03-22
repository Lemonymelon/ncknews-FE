import React, { Component } from "react";

class Order extends Component {
  render() {
    return (
      <div>
        <button>
          <i className="fas fa-arrow-up" />
        </button>
        <button>
          <i className="fas fa-arrow-down" />
        </button>
      </div>
    );
  }
}

export default Order;
