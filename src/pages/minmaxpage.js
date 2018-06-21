import React from 'react';

import { connect } from 'react-redux';
import { fetchMinMax } from 'actions/report-actions';
import { columns } from 'templates/column-templates/min-max-data-columns';

import RenderGrid from 'lib/grid/render-grid';

class MinMaxPage extends React.PureComponent {

    componentDidMount() {
        this.props.fetchMinMax();
    }    

    render() {
        return (
                <RenderGrid dyndata={this.props.dyndata}  columns={columns} />
        );
    }
}

const mapStateToProps = (state) => ({
    dyndata: state.report.min_max
});

export default connect(mapStateToProps, { fetchMinMax } )(MinMaxPage);
