import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import { products as productimp } from './products.json';

import './extra.css';

const products = productimp;


class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.createState(0, 10);
        this.pageChange = this.pageChange.bind(this);
        this.updatePagerState = this.updatePagerState.bind(this);
    }

    pageChange(event) {
        this.setState(this.createState(event.page.skip, event.page.take));
    }

    createState(skip, take) {
        return {
            items: products.slice(skip, skip + take),
            total: products.length,
            skip: skip,
            pageSize: take,
            pageable: this.state ? this.state.pageable : {
                buttonCount: 5,
                info: true,
                type: 'input',
                pageSizes: true,
                previousNext: true
            }
        };
    }

    updatePagerState(key, value) {
        const newPageableState = Object.assign({}, this.state.pageable, { [key]: value });
        this.setState(Object.assign({}, this.state, { pageable: newPageableState }));
    }

    render() {
        return (
            <div>
                <Grid
                    style={{ height: '280px' }}
                    data={this.state.items}
                    onPageChange={this.pageChange}
                    total={this.state.total}
                    skip={this.state.skip}
                    pageable={this.state.pageable}
                    pageSize={this.state.pageSize}
                >
                    <Column field="ProductID" />
                    <Column field="ProductName" title="Product Name" />
                    <Column field="UnitPrice" title="Unit Price" />
                </Grid>
            </div >
        );
    }
}


ReactDOM.render(<App />, document.getElementById("root"));

