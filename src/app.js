import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';

import Popup from './lib/grid/popup-columns';

import { columns } from './templates/column-templates/min-max-data-columns';

import { connect } from 'react-redux';
import { fetchMinMax } from 'actions/report-actions';

import './extra.css';


class App extends React.PureComponent {



    state = {
        dyndata : this.props.dyndata,
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

    componentDidMount() {
        //this.loadData();
        this.props.fetchMinMax();
    }    

    pageChange(event) {
        
        this.setState({
            skip: event.page.skip,
            pageSize: event.page.take
        });
        this.setState({
            items: this.getDynData()
        });  

    }

    filterChange(event) {
        this.setState({
            filter: event.filter
        });
        this.setState({
            items: this.getDynData()
        });   
    }

    sortChange(event) {
        this.setState({
          sort: event.sort
        });
        this.setState({
            items: this.getDynData()
        });         

    }


    isEmpty(obj) {
        return ! obj || Object.keys(obj).length === 0;
    }

    getDynData() {
        if (! this.props.dyndata )
            return [];
        let data = this.props.dyndata.slice();
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
        const { dyndata } = this.props;

        return (

      <div>

            <Popup columnsSelected={this.columnsSelected} columns={this.state.columns}  show={this.state.show} anchor={this.anchor} />


                <Grid
                    style={{ height: '400px' }}
                    data={this.getDynData()}
                    onPageChange={this.pageChange}
                    total={dyndata ? dyndata.length : 0 }
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



const mapStateToProps = (state) => ({
    dyndata: state.report.min_max
});

export default connect(mapStateToProps, { fetchMinMax } )(App);
