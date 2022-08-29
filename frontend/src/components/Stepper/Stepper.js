import { Component, Children, cloneElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import './Stepper.scss';

class Stepper extends Component {
  state = {
    activeStep: 0,
    totalSteps: this.props.children.length - 1,
  };

  toStep = (activeStep) => {
    this.setState({ activeStep });
  };

  render() {
    const { activeStep } = this.state;
    const { header, children } = this.props;
    const newChildren = Children.map(children, (child, index) =>
      cloneElement(child, {
        isActive: index === activeStep,
        toStep: (activeStep) => () => this.toStep(activeStep),
      }),
    );

    return (
      <div>
        <div className="stepper-header">
          {header.map((el, i) => {
            const stepperItemClassNames = [
              'stepper-item',
              i === activeStep && 'step-active',
              i < activeStep && 'step-done',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div className={stepperItemClassNames} key={`stepper-${i}`}>
                <span className="stepper-dash-left" />
                <span className="stepper-dash-right" />
                <div className="stepper-icon">
                  <FontAwesomeIcon icon={faCircle} size="2x" />
                  <span className="stepper-indicator">{i + 1}</span>
                </div>
                <p>{el}</p>
              </div>
            );
          })}
        </div>
        {newChildren}
      </div>
    );
  }
}

export default Stepper;
