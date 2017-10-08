import React, { Component } from 'react';
import $ from 'jquery';
import './Board.css';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
            headers: ["Category", "Title", "Price", "Location", "Date", "Stat"],
            data: []
        };
	}
	componentDidMount() {
		let data = [
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
		this.setState({ data: data })
	}
	handlePostSubmit(post) {
		console.log(post);
		$("#addPost").modal("hide");
		let data = this.state.data;
		data.push(post);
		data.sort((a,b) => {
			a = new Date(a["date"]);
			b = new Date(b["date"]);
			return a > b ? -1 : a < b ? 1 : 0;
		});
		this.setState({ data: data });
		console.log(this.state.data);
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
					<BoardTable headers={this.state.headers} data={this.state.data} />
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
								<BoardAddForm onAddition={this.handlePostSubmit.bind(this)}/>
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
    }

	render() {
		return (
			<div>
				<table className="table table-sm table-hover">
					<thead>
						<tr>
							{this.props.headers.map(header => {
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
						{this.props.data.map((row, index) => {
							return (
								<tr key={index}>
									<td className="category">{row["category"]}</td>
									<td className="title">{row["title"]}</td>
									<td className="price">${parseFloat(row["price"]).toFixed(2)}</td>
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

class BoardAddForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: ["Sell", "Buy"],
			post: {
				"category": "Sell",
        		"title": "",
        		"description": "",
        		"price": 0,
        		"location": "",
        		"date": "",
        		"stat": {
        			"views": 0,
        			"replies": 0
        		}
			}
		};
	}
	handleFormChange(e) {
		if (e.currentTarget.getAttribute("id") == "category-input") {
			this.state.post["category"] = e.currentTarget.value;
		} else if (e.currentTarget.getAttribute("id") == "location-input") {
			this.state.post["location"] = e.currentTarget.value;
		} else if (e.currentTarget.getAttribute("id") == "title-input") {
			this.state.post["title"] = e.currentTarget.value;
		} else if (e.currentTarget.getAttribute("id") == "description-input") {
			this.state.post["description"] = e.currentTarget.value;
		} else if (e.currentTarget.getAttribute("id") == "price-input") {
			this.state.post["price"] = parseFloat(e.currentTarget.value).toFixed(2);
		}
		this.setState({ post: this.state.post });
		console.log(this.state.post);
	}
	handlePostSubmit(e) {
		e.preventDefault();
		let data = {
			"category": this.state.post["category"],
    		"title": this.state.post["title"],
    		"description": this.state.post["description"],
    		"price": parseFloat(this.state.post["price"]).toFixed(2),
    		"location": this.state.post["location"],
    		"date": new Date().toISOString(),
    		"stat": {
    			"views": 0,
    			"replies": 0
    		}
		}
		this.state.post["category"] = "";
		this.state.post["title"] = "";
		this.state.post["description"] = "";
		this.state.post["price"] = 0;
		this.state.post["location"] = "";
		this.state.post["date"] = "";
		this.setState({ post: this.state.post });
		$("#category-input").val("Sell");
		$("#location-input").val("");
		$("#title-input").val("");
		$("#description-input").val("");
		$("#price-input").val("");
		this.props.onAddition(data);
	}
	render() {
		const title = this.state.post["title"];
		const isEnabled = title.length > 0;
		return (
			<div>
				<form id="postForm" onSubmit={this.handlePostSubmit.bind(this)}>
					<div className="row">
						<div className="col-md-6 mb-3">
							<div className="input-group mb-2 mb-sm-0">
								<label className="sr-only" htmlFor="category">Category</label>
								<div className="input-group-addon">Category</div>
								<select onChange={e => this.handleFormChange(e)} className="custom-select" id="category-input">
									{this.state.category.map(elem => {
										return <option key={elem} value={elem}>{elem}</option>
									})}
								</select>
							</div>
						</div>
						<div className="col-md-6 mb-3">
							<div className="input-group mb-2 mb-sm-0">
								<label className="sr-only" htmlFor="category">Location</label>
								<div className="input-group-addon">Location</div>
								<input onChange={e => this.handleFormChange(e)} type="text" className="form-control" id="location-input" placeholder="Location"/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group mb-2 mb-sm-0">
							<label className="sr-only" htmlFor="title">Title</label>
							<div className="input-group-addon">Title</div>
							<input onChange={e => this.handleFormChange(e)} type="text" className="form-control" id="title-input" placeholder="Title"/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group mb-2 mb-sm-0">
							<label className="sr-only" htmlFor="title">Description</label>
							<div className="input-group-addon">Description</div>
							<textarea onChange={e => this.handleFormChange(e)} type="text" className="form-control" rows="5" id="description-input" placeholder="Description"/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group mb-2 mb-sm-0">
							<label className="sr-only" htmlFor="title">Price</label>
							<div className="input-group-addon">$</div>
							<input onChange={e => this.handleFormChange(e)} type="number" min="0.01" step="0.01" className="form-control" id="price-input" placeholder="0.00"/>
						</div>
					</div>
					<button disabled={!isEnabled} type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
				</form>
			</div>
		);
	}
}

export default Board;
