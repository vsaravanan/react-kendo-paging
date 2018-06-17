import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import axios from 'axios';

//import { products as productimp } from './products.json';

import './extra.css';

//const products = productimp;


class App extends React.PureComponent {

    state = {
        products : [],
        loading: true,
        error : ''

    }

    constructor(props) {
        super(props);
        this.state = this.createState(0, 10);
        this.pageChange = this.pageChange.bind(this);
        this.updatePagerState = this.updatePagerState.bind(this);
    }

    loadData = () => {
        this.setState({ loading: true });
        return axios.get(`http://localhost:2990/products`)
          .then(res => {
            //const products = res.data;
            this.setState({ 
                products :  res.data,
                loading : false
                });
            })
            .catch(error => {
                console.error(`error: ${error}`);
                this.setState({
                    loading: false,
                    error: `${error}`
                });
            });


    }

    componentDidMount() {
        this.loadData();

    }    

    pageChange(event) {
        this.setState(this.createState(event.page.skip, event.page.take));
    }

    createState(skip, take) {
        return {
            items: this.state.products.slice(skip, skip + take),
            total: this.state.products.length,
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
        const { loading, error, products } = this.state;       
        if (loading) {
            return <p>Loading ...</p>;
        } 
        if (error) {
            return (
              <p>
                There was an error loading the repos.{' '}
                <button onClick={this.loadData}>Try again</button>
              </p>
            );
        }                
        return (
            <div>
                <Grid
                    style={{ height: '280px' }}
                    data={products}
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

