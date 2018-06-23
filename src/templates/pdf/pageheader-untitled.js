import React from 'react';

const PageHeader = (

        <div className='header' >
            <div>
               
            </div>
        </div>
);

export default class PageTemplate extends React.Component {
    render() {
        return (
            <div className="page-template">

                {PageHeader}

                <div className="footer">
                    <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
                        Page {this.props.pageNum} of {this.props.totalPages} </div>                
                </div>
            </div>            

        );
    }
}