import React from 'react';

import { connect } from 'react-redux';
import { fetchArticle59 } from 'actions/report-actions';
import { columns } from 'templates/column-templates/article59-columns';
//import PageTemplate from 'templates/pdf/pageheader-article59';

import RenderGrid from 'lib/grid/render-grid';

class Article59 extends React.PureComponent {

    componentDidMount() {
        this.props.fetchArticle59();
    }    

    render() {

        let pdfOptions = {
            fileName :  'Article59.pdf',
            title :     'Article59 Report',
            paperSize : 'Legal'
        }

        return (
                <RenderGrid dyndata={this.props.dyndata}  columns={columns}  pdf={pdfOptions}  />
        );
    }
}

const mapStateToProps = (state) => ({
    dyndata: state.report.article59
});

export default connect(mapStateToProps, { fetchArticle59 } )(Article59);
