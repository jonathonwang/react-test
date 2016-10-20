// ------------------------------------------------------------
// Weird Thing I dont wanna do but is necessary with TypeScript (As far as I know)
// assigns the imported jQuery object as jQuery && $ on window.
import * as jQuery from 'jquery';
Object.assign(Window.prototype, {
  jQuery,
  $: jQuery
});
import 'bootstrap';
// End Weird Bootstrap jQuery Stuff
// ------------------------------------------------------------

// ------------------------------------------------------------
// Begin React Stuff
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {TodoItem} from './components/TodoItem';
import {Alert} from './components/Alert';

interface ITodo {
    description: string;
    key: number;
}

interface IAlert {
  status: string;
  title: string;
  description: string;
  visible: boolean;
}

export interface IMainState {
    newItem?: {
        description: string;
    };
    todoList?: ITodo[];
    alert?: IAlert;
}

export interface IMainProps {}

export class Main extends React.Component<IMainProps, IMainState> {

  state: IMainState = {
    newItem: {description: ''},
    todoList: [],
    alert: {status: '', title: '', description: '', visible: false}
  };

  constructor () {
      super();
      this.changeName = this.changeName.bind(this);
      this.addItem = this.addItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.showAlert = this.showAlert.bind(this);
      this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  changeName (e: any) {
      this.setState({
          newItem: {
              description: e.target.value
          }
      });
  }

  showAlert (alert: IAlert) {
    this.setState(alert);
  }

  hideAlert () {
    let hiddenAlert: IAlert = {status: '', title: '', description: '', visible: false};
    this.setState({alert: hiddenAlert});
  }

  addItem () {
    const list = this.state.todoList;
    if (this.state.newItem.description.length > 0) {
      list.push({
        description: this.state.newItem.description,
        key: new Date().getTime()
      });
      this.setState({
        todoList: list,
        newItem: {description: ''}
      });
    } else {
      this.showAlert({
        status: 'danger',
        title: 'Heads Up:',
        description: 'Task Cannot Be Empty',
        visible: true
      });
    }
  }

  handleEnterKey (event) {
    event.key === 'Enter' ? this.addItem() : false;
  }

  removeItem (item: ITodo) {
    const list = this.state.todoList.filter(i => i.key !== item.key);
    this.setState({todoList: list});
  }

  render () {
    const todoItems = this.state.todoList.map(item => {
        return <TodoItem key={item.key} item={item} onRemove={this.removeItem} ></TodoItem>;
    });
    const alertStatus = `alert alert-${this.state.alert.status}`;
    const alert = <Alert alert={this.state.alert} className={alertStatus} status={this.state.alert.status} title={this.state.alert.title} description={this.state.alert.description} onHide={this.hideAlert}></Alert>;

    return (
      <div>
        {this.state.alert.visible === true ? alert : ''}
        {this.state.alert.visible}
        <ul className='list-group'>
          <li className='list-group-item'>
            <div className='form-inline'>
              <div className='form-group'>
                <input type='text' placeholder='Add New Task' value={this.state.newItem.description} onChange={this.changeName} onKeyPress={this.handleEnterKey} className='form-control'/>
              </div>
              <div className='form-group'>
                <button onClick={this.addItem} className='btn btn-primary pull-right'><span className='fa fa-plus'></span></button>
              </div>
            </div>
          </li>
          {todoItems}
        </ul>
      </div>
    );
  }
}
