import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import products from './products.json';

//import './extra.css';

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
                type: 'numeric',
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
                <div className="example-config row">
                    <div className="col-md-6">
                        <dl>
                            <dt>
                                Pager type:
                        </dt>
                            <dd>
                                <input
                                    type="radio"
                                    name="pager"
                                    id="numeric"
                                    className="k-radio"
                                    value="numeric"
                                    defaultChecked={true}
                                    onChange={e => { this.updatePagerState('type', e.target.value); }}
                                />
                                <label
                                    style={{ margin: "7px 3em 7px 0px", lineHeight: '1.2' }}
                                    className="k-radio-label"
                                    htmlFor="numeric"
                                >
                                    Numeric&nbsp;
                                </label>

                                <input
                                    type="radio"
                                    name="pager"
                                    id="input"
                                    className="k-radio"
                                    value="input"
                                    onChange={e => { this.updatePagerState('type', e.target.value); }}
                                />
                                <label
                                    style={{ margin: "7px 3em 7px 0px", lineHeight: '1.2' }}
                                    className="k-radio-label"
                                    htmlFor="input"
                                >
                                    Input&nbsp;
                                </label>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                Max. number of buttons:
                        </dt>
                            <dd>
                                <input
                                    defaultValue="5"
                                    className="k-textbox"
                                    type="number"
                                    onChange={e => { this.updatePagerState('buttonCount', e.target.valueAsNumber); }}
                                />
                            </dd>
                        </dl>
                    </div>
                    <div className="col-md-6 row">
                        <div className="col-md-12">
                            <input
                                className="k-checkbox"
                                defaultChecked={true}
                                id="showInfo"
                                type="checkbox"
                                onChange={e => { this.updatePagerState('info', e.target.checked); }}
                            />
                            <label
                                htmlFor="showInfo"
                                className="k-checkbox-label"
                            >
                                Show info
                        </label>
                        </div>

                        <div className="col-md-12">
                            <input
                                className="k-checkbox"
                                defaultChecked={true}
                                id="pageSize"
                                type="checkbox"
                                onChange={e => { this.updatePagerState('pageSizes', e.target.checked); }}
                            />
                            <label
                                htmlFor="pageSize"
                                className="k-checkbox-label"
                            >
                                Show page sizes
                        </label>
                        </div>


                        <div className="col-md-12">
                            <input
                                className="k-checkbox"
                                defaultChecked={true}
                                id="previousNext"
                                type="checkbox"
                                onChange={e => { this.updatePagerState('previousNext', e.target.checked); }}
                            />
                            <label
                                htmlFor="previousNext"
                                className="k-checkbox-label"
                            >
                                Show previous / next buttons
                        </label>
                        </div>
                    </div>
                </div>
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

