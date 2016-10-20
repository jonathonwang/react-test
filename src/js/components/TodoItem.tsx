import * as React from 'react';

interface ITodo {
  description: string;
}

export interface ITodoItemState {}

export interface ITodoItemProps {
  item: ITodo;
  onRemove?: (todo: ITodo) => any;
  key?: number;
}

export class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor () {
    super();
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem () {
    this.props.onRemove(this.props.item);
  }

  render () {
    return (
      <li className='list-group-item'>
        <span> {this.props.item.description} </span>
        <button onClick={this.removeItem} className='pull-right btn btn-danger btn-xs'><span className='fa fa-trash-o'></span></button>
      </li>
    );
  }
}
