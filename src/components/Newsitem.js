import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
      let {title , description ,imageurl , newsurl ,author ,date ,source}=this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
  <img src={imageurl?imageurl:"https://images.cnbctv18.com/wp-content/uploads/2023/03/market.jpg?impolicy=website&width=617&height=264"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <span className="badge rounded-pill bg-warning text-dark">{source}</span>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toUTCString()}</small></p>
    <a href={newsurl}  className="btn btn-sm btn-success" target={"_blank"}>Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
