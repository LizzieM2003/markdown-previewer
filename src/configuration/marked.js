import marked from 'marked';

marked.setOptions({
  breaks: true
});

export var renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
  var out = '<a href="' + href + '"' + ' target="_blank"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};


export default marked;
