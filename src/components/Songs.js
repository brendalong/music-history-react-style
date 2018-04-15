import React, {Component} from 'react';
import { rebase } from '../config/constants';
import AddSongForm from './AddSongForm';

import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    Row,
    Col } from 'reactstrap';

class Songs extends Component{
    constructor(props){
        super(props);
        console.log("Songs", props);
        this.authHandler = this.authHandler.bind(this);
        this.renderSongs = this.renderSongs.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addSong = this.addSong.bind(this);
        this.updateSong = this.updateSong.bind(this);
        this.removeSong = this.removeSong.bind(this);

        this.state = {
            uid: null,
            songs: {},
          }
    }

    renderSongs(key){
        const song = this.state.songs[key];
        return (
        <Col sm="4" key={key}>
            <Card>
                <CardBody>
                    <CardTitle><input type="text" name="title" value={song.title} placeholder="Title" onChange={(e) => this.handleChange(e, key)} /></CardTitle>
                    <CardText><input type="text" name="album" value={song.album} placeholder="Album"  onChange={(e) => this.handleChange(e, key)}/></CardText>
                    <CardText><input type="text" name="artist" value={song.artist} placeholder="Artist" onChange={(e) => this.handleChange(e, key)} /></CardText>
                    <CardText><input type="text" name="year" value={song.year} placeholder="Year"  onChange={(e) => this.handleChange(e, key)}/></CardText>

                    <CardText><select type="text" name="status" value={song.status} placeholder="Got It" onChange={(e) => this.handleChange(e, key)}>
                        <option value="own">Own</option>
                        <option value="nowown">Not Own</option>
                    </select></CardText>

                    <CardText><textarea type="text" name="desc" value={song.desc} placeholder="Desc" onChange={(e) => this.handleChange(e, key)}></textarea></CardText>
                    <button onClick={() => this.removeSong(key)}>Remove Song</button>
                </CardBody>
            </Card>
        </Col>
        )
    }

    handleChange(e, key) {
        const song = this.state.songs[key];
        // take a copy of that song and update it with the new data
        const updatedSong = {
          ...song,
          [e.target.name]: e.target.value
        }
        this.updateSong(key, updatedSong);
    };

    updateSong = (key, updatedSong) => {
        const songs = {...this.state.songs};
        songs[key] = updatedSong;
        this.setState({ songs });
    };

    addSong(song) {
        // update our state
        const songs = {...this.state.songs};
        // add in our new song and give it a unique value
        const timestamp = Date.now();
        songs[`song-${timestamp}`] = song;
        // set state
        this.setState({ songs });
    };

    removeSong = (key) => {
        const songs = {...this.state.songs};
        songs[key] = null;
        this.setState({ songs });
    };

    componentWillMount() {
     // this runs right before the <App> is rendered
     this.ref = rebase.syncState(`/muusers/${this.props.user}/songs`, {
        context: this,
        state: 'songs'
      });
    }

    componentWillUnmount() {
        rebase.removeBinding(this.ref);
      }

    componentDidMount(){
        // console.log("songs user", props.user);
        console.log("song component mount", this.props);
        // this.loadSongsToDom(this.props.user);
        if(this.props.user) {
            this.authHandler(null, this.props.user);
        }
    }

    authHandler(err, userData){
        if(err){
            //no user
            return;
        }
        const userRef = rebase.initializedApp.database().ref(userData);
        console.log("songs:authHandler:userRef", userRef);

        // query the firebase once for the user data
        userRef.once('value', (snapshot) => {
        const data = snapshot.val() || {};
        //snapshot - how does it look right now.
        this.setState({
          uid: userData,
         
        });
      });
    }


    render() {

        return(
            <div>
            
            <Row>
            <Col xs="12">
            Songs - only viewable by a logged in user 
            </Col>
            </Row>

            <Row>
            <Col>
            <h2>Songs</h2>
            </Col>
            </Row>
            <Row>
          
            {Object.keys(this.state.songs).map(this.renderSongs)}
          
            </Row>
           
            <hr />
           
            <Row>
           
            <AddSongForm addSong={this.addSong}/>
         
            </Row>
           
            </div>
        )
    }
}

export default Songs;