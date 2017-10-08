import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: ["Sell", "Buy"],
			post: {
				"category": "",
        		"title": "",
        		"price": 0,
        		"location": "",
        		"date": "",
        		"stat": {
        			"views": 0,
        			"replies": 0
        		}
			}
		}
	}
	
	render() {
		return (
			<div>
				<div className="card">
					<div className="card-header">
						<ul className="nav">
							<li className="nav-item mr-auto"><h3>Board</h3></li>
							<button className="nav-item btn btn-primary" id="add-button" data-toggle="modal" data-target="#addPost">
								<i className="fa fa-plus" aria-hidden="true"></i>
							</button>
						</ul>
					</div>
					<BoardTable />
				</div>
				<div className="modal fade" id="addPost" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="row">
										<div className="col-md-6 mb-3">
											<div className="input-group mb-2 mb-sm-0">
												<label className="sr-only" htmlFor="category">Category</label>
												<div className="input-group-addon">Category</div>
												<select onChange={e => this.handleFormChange(e)} className="custom-select" id="category">
													{this.state.category.map(elem => {
														return <option value={elem}>{elem}</option>
													})}
												</select>
											</div>
	    								</div>
	    								<div className="col-md-6 mb-3">
											<div className="input-group mb-2 mb-sm-0">
												<label className="sr-only" htmlFor="category">Location</label>
												<div className="input-group-addon">Location</div>
												<input type="text" className="form-control" id="location" placeholder="Location"/>
											</div>
	    								</div>
	    							</div>
    								<div className="form-group">
										<div className="input-group mb-2 mb-sm-0">
											<label className="sr-only" htmlFor="title">Title</label>
											<div className="input-group-addon">Title</div>
											<input type="text" className="form-control" id="title" placeholder="Title"/>
										</div>
    								</div>
    								<div className="form-group">
										<div className="input-group mb-2 mb-sm-0">
											<label className="sr-only" htmlFor="title">Description</label>
											<div className="input-group-addon">Description</div>
											<textarea type="text" className="form-control" rows="5" id="title" placeholder="Description"/>
										</div>
    								</div>
    								<div className="form-group">
										<div className="input-group mb-2 mb-sm-0">
											<label className="sr-only" htmlFor="title">Price</label>
											<div className="input-group-addon">$</div>
											<input type="number" min="0.01" step="0.01" className="form-control" id="price" placeholder="0.00"/>
										</div>
    								</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
}

class BoardTable extends Component {
	constructor(props) {
        super(props);
        this.state = {
            headers: ["Category", "Title", "Price", "Location", "Date", "Stat"],
            data: [
            	{
            		"category": "Sell",
            		"title": "I am selling this",
            		"price": 15.50,
            		"location": "Vancouver",
            		"date": "2017-10-07",
            		"stat": {
            			"views": 3000,
            			"replies": 2
            		}
            	},
            	{
            		"category": "Sell",
            		"title": "I am selling this",
            		"price": 15.50,
            		"location": "Vancouver",
            		"date": "2017-10-07",
            		"stat": {
            			"views": 3000,
            			"replies": 2
            		}
            	},
            	{
            		"category": "Sell",
            		"title": "I am selling this",
            		"price": 15.50,
            		"location": "Vancouver",
            		"date": "2017-10-07",
            		"stat": {
            			"views": 3000,
            			"replies": 2
            		}
            	},
            	{
            		"category": "Sell",
            		"title": "I am selling this",
            		"price": 15.50,
            		"location": "Vancouver",
            		"date": "2017-10-07",
            		"stat": {
            			"views": 3000,
            			"replies": 2
            		}
            	},
            ]
        };
    }

	render() {
		return (
			<div>
				<table className="table table-sm table-hover">
					<thead>
						<tr>
							{this.state.headers.map(header => {
								if (header == "Category") {
									return <th key={header} className="category">{header}</th>
								} else if (header == "Title") {
									return <th key={header} className="title">{header}</th>
								} else if (header == "Price") {
									return <th key={header} className="price">{header}</th>
								} else if (header == "Location") {
									return <th key={header} className="location">{header}</th>
								} else if (header == "Date") {
									return <th key={header} className="date">{header}</th>
								} else if (header == "Stat") {
									return <th key={header} className="stat">{header}</th>
								}
							})}
						</tr>
					</thead>
					<tbody>
						{this.state.data.map((row, index) => {
							return (
								<tr key={index}>
									<td className="category">{row["category"]}</td>
									<td className="title">{row["title"]}</td>
									<td className="price">{parseFloat(row["price"]).toFixed(2)}</td>
									<td className="location">{row["location"]}</td>
									<td className="date">{row["date"]}</td>
									<td className="stat">
										{row["stat"]["views"]} views<br/>
										{row["stat"]["replies"]} replies
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

// class BoardForm extends Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	rendor() {
// 		return (

// 		);
// 	}
// }

export default Board;