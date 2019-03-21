var server = require('../app')

var restify = require('restify-clients');
var assert = require('assert');
var chai = require('chai')

var should = chai.should()

var client = restify.createJsonClient('http://localhost:8080');

after(function (done) {
	server.close()
	done()
})

describe('GET /order/:file', () => {
	describe('Get an order', () => {
		it('Should return nothing and code 500 when file does not exists', (done) => {
			client.get('/order/salut', function(err, req, res, data) {
				res.statusCode.should.equal(500)
			})
			done()
		})
		it('Should return and image when the file exists', (done) => {
			client.get('/order/TestFile.jpg', function(err, req, res, data) {
				res.statusCode.should.equal(200)
			})
			done()
		})
	})
})

describe('GET /orders/:username', () => {
	describe('Get all orders of a username', () => {
		it('Should return code 500 for someone who does not exists', (done) => {
			client.get('/orders/bonjourjesuispersonne', function(err, req, res, data) {
				res.statusCode.should.equal(500)
			})
			done()
		})
		it('Should return code 200 for some who exists', (done) => {
			client.get('/orders/TestFile', function(err, req, res, data) {
				res.statusCode.should.equal(200)
			})
			done()
		})
	})
})
