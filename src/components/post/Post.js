import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import $ from 'jquery';
import Loader from '../loader/Loader';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {},
   			loading: true
		};
	}
	componentDidMount() {
		let data = [
        	{
        		"id": 1,
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
        		"id": 2,
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
        		"id": 3,
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
        		"id": 4,
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
        let post = data.find(elem => {
        	return elem["id"] == this.props.match.params.id;
        })
        this.setState({ post: post });
	}
	render() {
		return (
			<div className="card">
				<div className="card-body">
					{this.state.post["category"] == "Sell" ? 
						<h4 className="card-title">{this.state.post["title"]} <span className="badge badge-success">{this.state.post["category"]}</span></h4> :
						<h4 className="card-title">{this.state.post["title"]} <span className="badge badge-warning">{this.state.post["category"]}</span></h4>								
					}
					<h6 className="card-subtitle mb-2 text-muted">${parseFloat(this.state.post["price"]).toFixed(2)}</h6>
					<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				    <a href="#" class="card-link">Card link</a>
				    <a href="#" class="card-link">Another link</a>
				</div>
				<div class="card-footer text-muted text-center">
				    {this.state.post["date"]}
				</div>
			</div>
		);
	};
}

export default Post;