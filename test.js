const test = require('tape')
const maxstache = require('./')

test('should assert input types', function (t) {
  t.plan(2)
  t.throws(maxstache.bind(null), /string/)
  t.throws(maxstache.bind(null, 'foobar', 'no object'), /object/)
})

test('should replace strings', function (t) {
  t.plan(1)

  const str = 'My name is {{name}}'
  const ctx = { name: 'jjjohnny' }
  const res = maxstache(str, ctx)

  t.equal(res, 'My name is jjjohnny')
})

test('should work even if the string starts with a var', function (t) {
  t.plan(1)

  const str = '{{name}}, my name is'
  const ctx = { name: 'Yoda' }
  const res = maxstache(str, ctx)

  t.equal(res, 'Yoda, my name is')
})

test('should not modify incomplete curly bracket tags', function (t) {
  t.plan(2)

  const str = 'This gets changed: {{name}}, and }} after this gets preserved'
  const ctx = { name: 'Yoda' }
  const res = maxstache(str, ctx)

  t.equal(res, 'This gets changed: Yoda, and }} after this gets preserved')

  const str2 = 'These brackets are preserved {{bad_tag but {{name}} gets changed'
  const ctx2 = { name: 'Yoda' }
  const res2 = maxstache(str2, ctx2)

  t.equal(res2, 'These brackets are preserved {{bad_tag but Yoda gets changed')
})

test('should work even if two vars are next to each other', function (t) {
  t.plan(1)

  const str = '{{first}}{{second}}, my name is'
  const ctx = { first: 'Foo', second: 'bar' }
  const res = maxstache(str, ctx)

  t.equal(res, 'Foobar, my name is')
})
