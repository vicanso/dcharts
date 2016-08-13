import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Circle from '../lib/circle';

class App extends Component {
  componentDidMount() {
    const circle = new Circle(this.refs.defaultCircle);
    setTimeout(() => {
      // circle.set('startAngle', 0.3 * Math.PI);
      circle.render(0.2154);
    }, 500);
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
