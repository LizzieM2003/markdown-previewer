import React, { Component } from 'react';
import marked, { renderer } from './configuration/marked';
import './App.css';
import markdown from './data/markdown';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown
    };
  }

  render() {
    const markedHTML = { __html: marked(this.state.markdown, { renderer }) };

    return (
      <div className="App">
        <textarea
          id="editor"
          value={this.state.markdown}
          onChange={event => this.setState({ markdown: event.target.value })}
        />
        <div id="preview" dangerouslySetInnerHTML={markedHTML} />
      </div>
    );
  }
}

export default App;
