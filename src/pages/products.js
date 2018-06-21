import React from 'react';

import { connect } from 'react-redux';
import { fetchProducts } from 'actions/report-actions';
import { columns } from 'templates/column-templates/products-columns';

import RenderGrid from 'lib/grid/render-grid';

class Products extends React.PureComponent {

    componentDidMount() {
        this.props.fetchProducts();
    }    

    render() {
        return (
                <RenderGrid dyndata={this.props.dyndata} columns={columns} />
        );
    }
}

const mapStateToProps = (state) => ({
    dyndata: state.report.products
});

export default connect(mapStateToProps, { fetchProducts } )(Products);
