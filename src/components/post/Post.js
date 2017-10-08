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
			// {
   //      		"id": 0,
   //      		"category": "",
   //      		"title": "",
   //      		"price": 0,
   //      		"location": "",
   //      		"date": "",
   //      		"stat": {
   //      			"views": 0,
   //      			"replies": 0
   //      		}
   //      	}
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
		console.log(this.state.post);
		return (
			<div>
				This is {this.props.match.params.id} Individual post
				<Loader />
			</div>
		)
	}
}

export default Post;