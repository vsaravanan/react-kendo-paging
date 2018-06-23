import React from 'react';

import { Grid, GridColumn as Column, GridToolbar, GridPDFExport } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';

import Popup from 'lib/grid/popup-columns';
import PageTemplate from 'templates/pdf/pageheader-untitled';





export default class RenderGrid extends React.PureComponent {
    gridPDFExport;

    pdfGenericOptions = {
        fileName :  'Untitled.pdf',
        title :     'Untitled Title',
        paperSize: 'A4',
        scale : 0.5,
        margin : '1.5cm',
        landscape : true,
        repeatHeaders : true
    } 
    
    pdf = { ...this.pdfGenericOptions,  ...this.props.pdf }

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
        columns: this.props.columns,
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


    pageChange(event) {
        
        this.setState({
            skip: event.page.skip,
            pageSize: event.page.take
        });
    }

    filterChange(event) {
        this.setState({
            filter: event.filter
        });
  
    }

    sortChange(event) {
        this.setState({
          sort: event.sort
        });

    }
    
    exportPDF = () => {
        this.raisePDFExportRequestedFlag();
        let pdfdata = this.getDynData({ isPdf: true });
        this.gridPDFExport.save( pdfdata, this.lowerPDFExportRequestedFlag);
    }

    raisePDFExportRequestedFlag = () => {
        this.setState({ pdfExportRequested: true });
    }

    lowerPDFExportRequestedFlag = () => {
        this.setState({ pdfExportRequested: false });
    }

    isEmpty(obj) {
        return ! obj || Object.keys(obj).length === 0;
    }

    getDynData(isPdf = false) {
        if (! this.props.dyndata )
            return [];
        let data = this.props.dyndata.slice();
        if (! this.isEmpty(this.state.filter))
            data = filterBy(data, this.state.filter);
        if (! this.isEmpty(this.state.sort))
            data = orderBy(data, this.state.sort);
        if (! isPdf) {
            let skip = data.length < this.state.skip ? 0 : this.state.skip;
            data = data.slice(skip, skip + this.state.pageSize);
        }
        else {
            data = data.slice(0,1);
        }
        return data;
    }

    columnsSelected = (data) => {
        this.setState(data);
    } 
    
    printData = () => {
        return ( this.state.columns.map((column, idx) =>
                    column.show &&
                    (<Column key={idx} 
                        field={column.field} 
                        title={column.title} 
                        filter={column.filter} 
                        width={column.width} 
                        filterable={column.filterable}  /> )
        ));
    }


    render() {
        const { dyndata } = this.props;

        const grid = (
            <Grid
            ref={(grid) => this.grid = grid}
            style={{ height: '600px' }}
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

                <button
                    title="Export PDF"
                    className="k-button k-primary"
                    onClick={this.exportPDF}
                    disabled={this.state.pdfExportRequested}
                >
                    Export PDF
                </button>
            </GridToolbar>
            
            {this.printData()}
        
            </Grid>

        );

        const thisPageTemplate = (this.props.PageTemplate ? this.props.PageTemplate : PageTemplate )

        return (

            <div>


                <Popup 
                    columnsSelected={this.columnsSelected} 
                    columns={this.state.columns}  
                    show={this.state.show} 
                    anchor={this.anchor} 
                    />


                {grid}

                <GridPDFExport
                    pageTemplate={thisPageTemplate}
                    paperSize={this.pdf.paperSize}
                    scale={this.pdf.scale}
                    margin={this.pdf.margin}
                    landscape = {this.pdf.landscape}
                    fileName = {this.pdf.fileName}
                    title = {this.pdf.title}
                    repeatHeaders = {this.pdf.repeatHeaders}
                    ref={(element) => { this.gridPDFExport = element; }} >
                    {grid}

                </GridPDFExport>                    


            </div >
        );
    }
}


