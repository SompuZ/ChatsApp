import React from "react";
import ChatInputBox from "./ChatInputBox";
import "./chatstyle2.css";
import ContactList from "./ContactList";
import ChatBox from "./ChatBox";
import { Link } from "react-router-dom";

export default class ChatWindow extends React.Component{

    constructor(props){
        super(props);
		this.state={
			pendingMsg:null,
			cname:""
		};
		this.setPendingMessage=this.setPendingMessage.bind(this);

		const url = 'ws://localhost:8081'
		const connection = new WebSocket(url)
		
		connection.onopen = () => {
			connection.send('Client Online:-'+this.state.cname); 
		}
		
		connection.onerror = (error) => {
			console.log(`WebSocket error: ${error}`)
		}
		
		connection.onmessage = (e) => {
			console.log("Server:-"+e.data)
		}
    }

	static getDerivedStateFromProps(nextProps, prevState){
        console.log("Chat Token:"+nextProps.getToken());
		let tokenJson=JSON.parse(nextProps.getToken());
        return {
			cname:tokenJson.cname
		}
    }

	setPendingMessage(msg){
		console.log("pending message="+msg);
		var message={
			type:"Sent",
			msg: String(msg)
		}
		this.setState({
            pendingMsg:(message)
        })
	}

    render(){
        return(
        <div>
			<p align="center">
			<Link to={{pathname:"/"}}>Home</Link>
			<Link to={{pathname:"/logout"}}>Logout</Link>
			<br></br>
			<h2>Welcome {this.state.cname}</h2>
			</p>
          <div class="container-fluid h-100">
			<div class="row justify-content-center h-100">
				<div class="col-md-4 col-xl-3 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
					<div class="card-header">
						<div class="input-group">
							<input type="text" placeholder="Search..." name="" class="form-control search"/>
							<div class="input-group-prepend">
								<span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
							</div>
						</div>
					</div>
					<div class="card-body contacts_body">
						<ui class="contacts">
                            <ContactList/>
						</ui>
					</div>
					<div class="card-footer"></div>
				</div></div>
				<div class="col-md-8 col-xl-6 chat">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img"/>
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>ChatBox</span>
									<p>5 Messages</p>
								</div>
								<div class="video_cam">
									<span><i class="fas fa-video"></i></span>
									<span><i class="fas fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu">
								<ul>
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div class="card-body msg_card_body">
						<ChatBox pendingMsg={this.state.pendingMsg}/>	
                        </div>
						<ChatInputBox hasPendingMessage={this.setPendingMessage}/>
					</div>
				</div>
			</div>
		</div>
        </div>
        );
    }
};