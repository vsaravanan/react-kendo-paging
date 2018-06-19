import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import { Popup } from '@progress/kendo-react-popup'

import axios from 'axios';

import './extra.css';


class App extends React.PureComponent {

    columns = [
        {
          title: 'Product Id',
          field: 'ProductID',
          filter: 'numeric',
          show: true
        },
        {
          title: 'Product Name',
          field: 'ProductName',
          show: true
        },
        {
          title: 'Quantity Per Unit',
          field: 'QuantityPerUnit',
          show: true
        },
        {
          title: 'Unit Price',
          field: 'UnitPrice',
          filter: 'numeric',
          show: true
        },
        {
          title: 'Units In Stock',
          field: 'UnitsInStock',
          filter: 'numeric',
          show: true
        },
        {
          title: 'Discontinued',
          field: 'Discontinued',
          show: true
        }
      ]
    
      oneVisibleColumn = false

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
        columns: this.columns,
        show:false


    }

    constructor(props) {
        super(props);
        this.pageChange = this.pageChange.bind(this);
        this.filterChange = this.filterChange.bind(this);
        this.sortChange = this.sortChange.bind(this);

    }

    toggleColumn = (id) => {
        let visibleSolumnsCount = 0
        for(let i = 0; i <this.state.columns.length; i++ ){
          if(this.state.columns[i].show === true){
            visibleSolumnsCount++
          }
        }
        if(visibleSolumnsCount === 2 && this.state.columns[id].show === true){
          this.oneVisibleColumn = true
        }
        else{
          this.oneVisibleColumn = false
        }
        this.setState({ columns: this.state.columns.map((column, idx) => idx  === id ? { ...column, show: !column.show } : column) })
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
        <Popup
          anchor={this.anchor}
          show={this.state.show}
          popupClass={'popup-content'}
        >
          <div>
            { this.state.columns.map((column, idx) =>
              (
                <div key={idx}>
                 <span className="col-md-3 col-sm-4">
                  <input id={idx} className="k-checkbox" 
                    disabled={column.show && this.oneVisibleColumn} type="checkbox" readOnly={true} checked={column.show} 
                    onClick={() => { this.toggleColumn(idx) }} />
                  <label htmlFor={idx} className="k-checkbox-label" >{column.title}</label>
                 </span>
                </div>
              )
            )}
          </div>
        </Popup>

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

                    <GridToolbar>
                        <button
                            title="Click"
                            className="k-button k-primary"
                            onClick={this.onClick}
                            ref={(button) => {
                            this.anchor = button;
                        }}
                        >{this.state.show ? 'Hide column menu' : 'Show column menu'}
                        </button>
                    </GridToolbar>

                    {this.state.columns.map((column, idx) =>
                        column.show &&
                            (
                            column.filter ?
                            <Column key={idx} field={column.field} title={column.title} filter={column.filter} /> :
                            <Column key={idx} field={column.field} title={column.title}   /> 
                            )

                    )}                    
                </Grid>
            </div >
        );
    }
}


ReactDOM.render(<App />, document.getElementById("root"));

