import React from 'react';
import {
    Card,
    CardHeader,
    CardText,
    CardBody,
    Label,
    Col } from 'reactstrap';

class AddSongForm extends React.Component {
  createSong(event) {
    event.preventDefault();
    console.log('Gonna Add Songs');
    const song = {
      title: this.title.value,
      album: this.album.value,
      status: this.status.value,
      year: this.year.value,
      desc: this.desc.value,
    }

    this.props.createSong(song);
    this.songForm.reset();
  }

  render() {
    return (
        <Col>
    <Card>
      <form ref={(input) => this.songForm = input} className="song-edit" onSubmit={(e) => this.createSong(e)}>
      <CardHeader>Add A New Song</CardHeader>
     
       
            <Label>Title</Label>
            <input ref={(input) => this.title = input} type="text" placeholder="Title" />
     
            <CardText><input ref={(input) => this.album = input} type="text" placeholder="Album" /></CardText>
            <CardText><input ref={(input) => this.artist = input} type="text" placeholder="Artist" /></CardText>
            <CardText><input ref={(input) => this.year = input} type="text" placeholder="Year" /></CardText>

            <CardText><select ref={(input) => this.status = input}>
          <option value="own">Own It.</option>
          <option value="notOwn">Not Own</option>
        </select></CardText>
        <div><textarea ref={(input) => this.desc = input} placeholder="Song Desc" ></textarea></div>
        <div><button type="submit">+ Add Song</button></div>
       
      </form>
      </Card>
      </Col>
    )
  }
}

export default AddSongForm;
