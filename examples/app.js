import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Circle from '../lib/circle';
import Pie from '../lib/pie';

class App extends Component {
  componentDidMount() {
    const refs = this.refs;
    const defaultCircle = new Circle(refs.defaultCircle);
    defaultCircle.render(Math.random());

    const noneBGCircle = new Circle(refs.noneBGCircle);
    noneBGCircle.set('disabled.background', true);
    noneBGCircle.render(Math.random());

    const liveUpdateCircle = new Circle(refs.liveUpdateCircle);
    liveUpdateCircle.render(Math.random());
    setInterval(() => {
      liveUpdateCircle.update(Math.random());
    }, 1000);

    const changeFillColorCircle = new Circle(refs.changeFillColorCircle);
    const newColor = 'RGB(67, 67, 72)';
    changeFillColorCircle.set('style.foreground.fill', newColor);
    changeFillColorCircle.set('style.label.fill', newColor);
    changeFillColorCircle.render(Math.random());

    const thicknessFullFillCircle = new Circle(refs.thicknessFullFillCircle);
    thicknessFullFillCircle
      .set({
        'disabled.background': true,
        'thickness': '100%',
        'style.label.fill': 'RGB(67, 67, 72)',
      })
      .render(Math.random());


    const defaultPie = new Pie(refs.defaultPie);
    defaultPie.render([10, 20, 40]);


    const maxCountPie = new Pie(refs.maxCountPie);
    maxCountPie.render([10, 30]);
  }
  render() {
    return (
      <div style={{
        paddingBottom: '20px',
      }}>
        <h2>Circle Examples</h2>
        <div className="pure-g">
          <section className="pure-u-1-4 chartSection">
            <h3>Default</h3>
            <svg
              ref="defaultCircle"
            >
            </svg>
          </section>
          <section className="pure-u-1-4 chartSection">
            <h3>Without Background</h3>
            <svg
              ref="noneBGCircle"
            >
            </svg>
          </section>
          <section className="pure-u-1-4 chartSection">
            <h3>Live Update</h3>
            <svg
              ref="liveUpdateCircle"
            >
            </svg>
          </section>
          <section className="pure-u-1-4 chartSection">
            <h3>Change Fill Color</h3>
            <svg
              ref="changeFillColorCircle"
            >
            </svg>
          </section>
          <section className="pure-u-1-4 chartSection">
            <h3>Thickness Full Fill</h3>
            <svg
              ref="thicknessFullFillCircle"
            >
            </svg>
          </section>
        </div>
        <h2>Pie Examples</h2>
        <div className="pure-g">
          <section className="pure-u-1-4 chartSection">
            <h3>Default</h3>
            <svg
              ref="defaultPie"
            >
            </svg>
          </section>
          <section className="pure-u-1-4 chartSection">
            <h3>Set Max Count</h3>
            <svg
              ref="maxCountPie"
            >
            </svg>
          </section>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
