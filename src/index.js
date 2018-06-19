import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';

import axios from 'axios';
import './extra.css';


class App extends React.PureComponent {

    state = {
        products : [],
        loading: true,
        error : '',
        pageable: {
            buttonCount: 5,
            info: true,
            type: 'input',
            pageSizes: true,
            previousNext: true      
        },
        items : [],
        total:100,
        skip:0,
        pageSize:10,
        filter : {},
        sort: []


    }

    constructor(props) {
        super(props);
        this.pageChange = this.pageChange.bind(this);
        this.filterChange = this.filterChange.bind(this);
        this.sortChange = this.sortChange.bind(this);

    }

    loadData = () => {
        this.setState({ loading: true });
        return axios.get(`http://localhost:2990/products`)
          .then(res => {
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
        this.setState( Object.assign({}, this.state, this.createState(event.page.skip, event.page.take))); 
    }

    createState(skip, take) {
        return {
            skip: skip,
            pageSize: take,
        };
    }

    filterChange(event) {
        this.setState({
            filter: event.filter
        });
        this.setState({
            items: this.getProducts()
        });   
    }

    sortChange(event) {
        this.setState({
          sort: event.sort
        });
        this.setState({
            items: this.getProducts()
        });         

    }


    isEmpty(obj) {
        return ! obj || Object.keys(obj).length === 0;
    }

    getProducts() {
        let data = this.state.products.slice();
        if (! this.isEmpty(this.state.filter))
            data = filterBy(data, this.state.filter);
        if (! this.isEmpty(this.state.sort))
            data = orderBy(data, this.state.sort);
        return data;
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
        console.log(this.state.filter);
        return (
            <div>
                <Grid
                    style={{ height: '280px' }}
                    
                    data={this.getProducts().slice(this.state.skip, this.state.skip + this.state.pageSize) }
                    onPageChange={this.pageChange}
                    total={products.length}
                    skip={this.state.skip}
                    pageable={this.state.pageable}
                    pageSize={this.state.pageSize}
                    filterable = {true}
                    filter={this.state.filter}
                    onFilterChange={this.filterChange}    
                    sortable={true}
                    sort={this.state.sort}
                    onSortChange={this.sortChange}
          
                    
                >
                    <Column field="ProductID" filter="numeric"  />
                    <Column field="ProductName" title="Product Name" />
                    <Column field="UnitPrice" title="Unit Price" filter="numeric"  />
                </Grid>
            </div >
        );
    }
}


ReactDOM.render(<App />, document.getElementById("root"));

