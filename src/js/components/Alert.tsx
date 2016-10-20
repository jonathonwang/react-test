import * as React from 'react';

interface IAlert {
  status: string;
  title: string;
  description: string;
  visibility: boolean;
}

export interface IAlertState {}

export interface IAlertProps {
  alert: IAlert;
  onHide?: (alert: IAlert) => any;
  onShow?: (alert: IAlert) => any;
}

export class Alert extends React.Component<IAlertProps, IAlertState> {
  constructor () {
    super();
    this.hideAlert = this.hideAlert.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  hideAlert () {
    this.props.onHide(this.props.alert);
  }
  showAlert () {
    this.props.onShow(this.props.alert);
  }

  render () {
    return (
      <div className='alert alert-danger'>
        <span> {this.props.alert.title} </span>
        <span> {this.props.alert.description} </span>
        <button onClick={this.hideAlert} className='pull-right btn btn-danger btn-xs'><span className='fa fa-times'></span></button>
      </div>
    );
  }
}
