import * as React from 'react';
import { ReactNode, ChangeEvent } from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

/**
 * Renders an information card using Bootstrap classes.
 *
 * Properties: title
 */

// ulike card oppsett
export class IceboxsCard extends Component<{ title: ReactNode; children: ReactNode }> {
  render() {
    return (
      <div className="icebox cards">
        <div className="icebox-body">
          <h5 className="icebox-title">{this.props.title}</h5>
          <div className="icebox-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class RecipeView extends Component<{ img: string; name: string; numbOfPors: number }> {
  render() {
    return (
      <div className="recipe-div text-center">
        <div className="recipe-body">
          <img className="image" src={this.props.img} alt="bilde av oppskrift" />
          <h6 className="recipe-title pad">{this.props.name}</h6>
        </div>
      </div>
    );
  }
}

export class Cards extends Component<{
  title?: ReactNode;
  children?: ReactNode;
  numbOfPors?: number;
}> {
  render() {
    return (
      <div className="card cards cards-white text-center">
        <div className="card-body cards-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
        <div className="card-footer">{this.props.numbOfPors} porsjoner</div>
      </div>
    );
  }
}

export class Cardse extends Component<{
  title?: ReactNode;
  children?: ReactNode;
  numbOfPors?: number;
}> {
  render() {
    return (
      <div className="card cards cards-white text-center">
        <div className="card-body cards-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class Card extends Component<{ title?: ReactNode; children?: ReactNode }> {
  render() {
    return (
      <div className="card">
        <div className="card-body bak">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class CardFull extends Component<{ title?: ReactNode; children?: ReactNode }> {
  render() {
    return (
      <div className="card hundred bak">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class Oppskrifter extends Component<{ title: ReactNode; children: ReactNode }> {
  render() {
    return (
      <div className="card oppskrifter">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class Mat extends Component<{ title: ReactNode; children: ReactNode }> {
  render() {
    return (
      <div className="card mat">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class Car extends Component<{ title?: ReactNode; children?: ReactNode }> {
  render() {
    return (
      <div className="card car car-white">
        <div className="card-body car-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

/**
 * Renders a row using Bootstrap classes.
 */
export class Row extends Component<{ children: ReactNode }> {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

// sentrert row

export class Rows extends Component<{ children: ReactNode }> {
  render() {
    return <div className="row rows">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes.
 *
 * Properties: width, right
 */

// ulike colummn til ulike form??l

export class Column extends Component<{
  width?: number | undefined;
  right?: boolean | undefined;
  children: ReactNode;
}> {
  render() {
    return (
      <div className={'col' + (this.props.width ? '-' + this.props.width : '')}>
        <div className={'float-' + (this.props.right ? 'end' : 'start')}>{this.props.children}</div>
      </div>
    );
  }
}

export class Columns extends Component<{
  width?: number | undefined;
  right?: boolean | undefined;
  children: ReactNode;
}> {
  render() {
    return (
      <div className="col-4">
        <div className={'float-' + (this.props.right ? 'end' : 'start')}>{this.props.children}</div>
      </div>
    );
  }
}

export class Colum extends Component<{
  width?: number | undefined;
  right?: boolean | undefined;
  children: ReactNode;
}> {
  render() {
    return (
      <div className="col-6">
        <div className={'float-' + (this.props.right ? 'end' : 'start')}>{this.props.children}</div>
      </div>
    );
  }
}

class ButtonSuccess extends Component<{
  small?: boolean | undefined;
  children: ReactNode;
  id?: string;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-success"
        id={this.props.id?.toString()}
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
                width: '200px',
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a danger button using Bootstrap styles.
 *
 * Properties: small, onClick
 */
class ButtonDanger extends Component<{
  small?: boolean;
  children: ReactNode;
  id?: string;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-danger"
        id={this.props.id?.toString()}
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a light button using Bootstrap styles.
 *
 * Properties: small, onClick
 */
class ButtonLight extends Component<{
  small?: boolean;
  children: ReactNode;
  id?: string;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-light"
        id={this.props.id?.toString()}
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a button using Bootstrap styles.
 *
 * Properties: onClick
 */
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
}

/**
 * Renders a NavBar link using Bootstrap styles.
 *
 * Properties: to
 */
class NavBarLink extends Component<{ to: string; children: ReactNode }> {
  render() {
    return (
      <NavLink className="nav-link nav-link-white" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

class NavBarLinks extends Component<{ to: string; children: ReactNode }> {
  render() {
    return (
      <NavLink
        className="nav-link nav-links nav-links-white"
        activeClassName="active"
        to={this.props.to}
      >
        {this.props.children}
      </NavLink>
    );
  }
}

/**
 * Renders a NavBar using Bootstrap classes.
 *
 * Properties: brand
 */
export class NavBar extends Component<{ brand: ReactNode; children: ReactNode }> {
  static Link = NavBarLink;
  static Links = NavBarLinks;

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid justify-content-start">
          <NavLink
            className="navbar-brand navbar-brand-white"
            activeClassName="active"
            exact
            to="/"
          >
            {this.props.brand}
          </NavLink>
          <div className="navbar-nav">{this.props.children}</div>
        </div>
      </nav>
    );
  }
}

/**
 * Renders a form label using Bootstrap styles.
 */
class FormLabel extends Component<{ children: ReactNode }> {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

/**
 * Renders a form input using Bootstrap styles.
 */
class FormInput extends Component<{
  id: string | '';
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { type, value, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        id={this.props.id}
        onChange={this.props.onChange}
      />
    );
  }
}

/**
 * Renders a form textarea using Bootstrap styles.
 */
class FormTextarea extends React.Component<{
  id: string | '';
  value: string | number;

  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, rows, cols
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, ...rest } = this.props;

    return (
      <textarea
        {...rest}
        className="form-control"
        value={value}
        onChange={onChange}
        id={this.props.id}
      />
    );
  }
}

/**
 * Renders a form checkbox using Bootstrap styles.
 */
class FormCheckbox extends Component<{
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { checked, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-check-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    );
  }
}

/**
 * Renders a form inline using Bootstrap styles.
 */
class FormSelect extends Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, size.
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, children, ...rest } = this.props;
    return (
      <select style={{ width: '220px' }} {...rest} value={value} onChange={onChange}>
        {children}
      </select>
    );
  }
}

/**
 * Renders form components using Bootstrap styles.
 */
export class Form {
  static Label = FormLabel;
  static Input = FormInput;
  static Textarea = FormTextarea;
  static Checkbox = FormCheckbox;
  static Select = FormSelect;
}

/**
 * Renders alert messages using Bootstrap classes.
 *
 * Students: this slightly more complex component is not part of curriculum.
 */
export class Alert extends Component {
  alerts: { id: number; text: ReactNode; type: string }[] = [];
  nextId: number = 0;

  render() {
    return (
      <div id="alerts" className="alerts">
        {this.alerts.map((alert, i) => (
          <div
            key={alert.id}
            id={'test'}
            className={'alert alert-dismissible alert-' + alert.type}
            role="alert"
            // @ts-ignore
            onClick={this.deleteMessage(i)}
          >
            {alert.text}
            <button
              type="button"
              className="btn-close btn-sm"
              onClick={() => this.alerts.splice(i, 1)}
            />
          </div>
        ))}
      </div>
    );
  }

  deleteMessage(i: number) {
    setTimeout(() => {
      this.alerts.splice(i, 1);
    }, 4000);
  }

  /**
   * Show success alert.
   */
  static success(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'success' });
    });
  }

  /**
   * Show info alert.
   */
  static info(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'info' });
    });
  }

  /**
   * Show warning alert.
   */
  static warning(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'warning' });
    });
  }

  /**
   * Show danger alert.
   */
  static danger(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'danger' });
    });
  }
}
