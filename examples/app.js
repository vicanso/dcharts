import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Circle from '../lib/circle';

class App extends Component {
  componentDidMount() {
    this.defaultCircle = new Circle(this.refs.defaultCircle);
    setTimeout(() => {
      this.defaultCircle.render();
    }, 5000);
  }
  render() {
    return (
      <div>
        <section>
          <h3>Default Circle</h3>
          <svg
            className="chart"
            ref="defaultCircle"
          >
          </svg>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
