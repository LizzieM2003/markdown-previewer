import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import marked, { renderer } from './configuration/marked';

import App from './App';
import markdown from './data/markdown';

configure({ adapter: new Adapter() });

const app = shallow(<App />);

const markedHTML = marked(markdown, { renderer });
// console.log(markedHTML);

describe('App', () => {
  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('has a textarea with id `editor`', () => {
    expect(app.find('textarea#editor').exists()).toBe(true);
  });

  it('has a preview element with id `preview`', () => {
    expect(app.find('#preview').exists()).toBe(true);
  });

  it('has an initial state set to markdown data', () => {
    expect(app.state().markdown).toBe(markdown);
  });

  it('sets the value of the textarea element to the markdown data', () => {
    expect(app.find('textarea#editor').props().value).toBe(markdown);
  });

  it('sets the HTML of the preview element to the converted markdown data', () => {
    expect(app.find('#preview').html()).toBe(
      '<div id="preview">' + markedHTML + '</div>'
    );
  });

  describe('when typing into the textarea', () => {
    const newMarkdown = `
      Heading
      =======
      
      ## Sub-heading
       
      Paragraphs are separated
      by a blank line.
      
      Two spaces at the end of a line  
      produces a line break.
      
      Text attributes _italic_, 
      **bold**, \`monospace\`.
      
      Horizontal rule:
      
      ---
      `;

    const newMarkedHTML = marked(newMarkdown);

    beforeEach(() => {
      app
        .find('textarea#editor')
        .simulate('change', { target: { value: newMarkdown } });
    });

    it('updates the `state`', () => {
      expect(app.state().markdown).toBe(newMarkdown);
    });

    it('updates the `preview` element with the changes', () => {
      expect(app.find('#preview').html()).toBe(
        '<div id="preview">' + newMarkedHTML + '</div>'
      );
    });
  });
});
