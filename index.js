'use strict'

var toString = require('mdast-util-to-string')
var visit = require('unist-util-visit')
var slugs = require('github-slugger')()

module.exports = slug

function slug() {
  return transformer
}

// Patch slugs on heading nodes.
function transformer(ast) {
  slugs.reset()

  visit(ast, 'heading', visitor)

  function visitor(node) {
    var data = node.data || (node.data = {})
    var props = data.hProperties || (data.hProperties = {})
    var id = slugs.slug(props.id || toString(node), true)

    data.id = id
    props.id = id
  }
}
