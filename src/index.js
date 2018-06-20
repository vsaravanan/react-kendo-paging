import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';

import axios from 'axios';
import { columns } from './templates/column-templates/min-max-data-columns';

import Popup from './lib/grid/popup-columns';

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
        sort: [],
        columns: columns,
        show:false


    }

    constructor(props) {
        super(props);
        this.pageChange = this.pageChange.bind(this);
        this.filterChange = this.filterChange.bind(this);
        this.sortChange = this.sortChange.bind(this);

    }


    
    onClick = () => {
        this.setState({ show: !this.state.show });
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
        
        this.setState({
            skip: event.page.skip,
            pageSize: event.page.take
        });
        this.setState({
            items: this.getProducts()
        });  

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
        data = data.slice(this.state.skip, this.state.skip + this.state.pageSize);
        return data;
    }

    columnsSelected = (data) => {
        this.setState(data);
    } 
    
    printData = () => {
        return ( this.state.columns.map((column, idx) =>
                    column.show &&
                    (<Column key={idx} field={column.field} title={column.title} filter={column.filter} /> )
        ));
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

            <Popup columnsSelected={this.columnsSelected} columns={this.state.columns}  show={this.state.show} anchor={this.anchor} />


                <Grid
                    style={{ height: '400px' }}
                    data={this.getProducts()}
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
                    resizable={true}
                    reorderable={true}

                >

                    <GridToolbar  >
                        <button
                            title="Click"
                            className="k-button k-primary"
                            onClick={this.onClick}
                            ref={(button) => {
                            this.anchor = button;
                        }}
                        >{this.state.show ? 'Hide Columns' : 'Columns'}
                        </button>
                    </GridToolbar>
                    
                   {this.printData()}
                  
                </Grid>
            </div >
        );
    }
}


ReactDOM.render(<App />, document.getElementById("root"));

