import React from 'react';

import { Popup as KendoPopup } from '@progress/kendo-react-popup';
import { toggleColumn } from './column-lib';


export default class Popup extends React.Component {

    oneVisibleColumn = false;

    constructor(props) {
            super(props);
            this.state = {
               ...props
            }
        }

    columnsSelected(idx) {
        const toggled = toggleColumn(idx, this.state.columns);
        this.oneVisibleColumn = toggled.oneVisibleColumn;
        this.setState(toggled);
        this.props.columnsSelected(toggled);

    } 

    render() {
        return (

            <KendoPopup
            anchor={this.props.anchor}
            show={this.props.show}
            popupClass={'popup-content'}
            >
            <div>
              { this.state.columns.map((column, idx) =>
                (
                  <div key={idx}>
                   <span className="col-md-3 col-sm-4">
                    <input id={idx} className="k-checkbox" 
                      disabled={column.show && this.oneVisibleColumn} type="checkbox" readOnly={true} checked={column.show} 
                      onClick={() => this.columnsSelected(idx)} />
                    <label htmlFor={idx} className="k-checkbox-label" >{column.title}</label>
                   </span>
                  </div>
                )
              )}
            </div>
            </KendoPopup>            
        );
      }
}