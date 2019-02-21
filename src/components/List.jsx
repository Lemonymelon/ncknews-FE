// import React, { Component } from 'react';
// import { Link } from "@reach/router";

// class List extends Component {
//     render() {
//         const {resource, resourceKey, resourceIdentifier, comment_count = '', author = ''} = this.props;
//         {console.log(this.props.location.url)}
//         return (
//             <div className="ListBarTab">
//                 List
//                 {resource.map(item => {
//                     return (
//                         <div key={item[resourceKey]}className="listItem">
//                         <Link to={`/${this.props.location.url}/${item[resourceKey]}`}><span>{item[resourceIdentifier]}</span></Link>

//                         {item.author && <span>{item.comment_count} || {item.author} </span>}
//                         </div>
//                     )
//                 })}
//             </div>
//         );
//     }
// }

// export default List;
