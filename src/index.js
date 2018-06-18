import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
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
        pageSize:10

    }

    constructor(props) {
        super(props);
        this.pageChange = this.pageChange.bind(this);

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
                    data={products.slice(this.state.skip, this.state.skip + this.state.pageSize)}
                    onPageChange={this.pageChange}
                    total={products.length}
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

