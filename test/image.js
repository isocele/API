var server = require('../app')

var restify = require('restify-clients');
var assert = require('assert');
var chai = require('chai')

var should = chai.should()

var client = restify.createJsonClient('http://localhost:8080');

client.basicAuth('$login', '$password');

describe('GET /order/:file', () => {
	describe('Get an order', () => {
		it('Should return an image if :file exist', (done) => {
			client.get('/order/salut', function(err, req, res, data) {
				res.statusCode.should.equal(500)
			})
			client.get('/order/TestFile.jpg', function(err, req, res, data) {
				res.statusCode.should.equal(200)
			})
			done()
		})
	})
})

describe('GET /orders/:username', () => {
	describe('Get all orders of a username', () => {
		it('Should return all orders of someone base on his username', (done) => {
			client.get('/orders/bonjourjesuispersonne', function(err, req, res, data) {
				res.statusCode.should.equal(500)
			})
			client.get('/orders/TestFile', function(err, req, res, data) {
				res.statusCode.should.equal(200)
			})
			done()
		})
	})
})
