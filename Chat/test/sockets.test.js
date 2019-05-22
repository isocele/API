'use strict';
const io = require('socket.io-client');
const server = require('../app');
const assert = require('assert');
const expect = require('expect');

let socket;

beforeEach(async (done) => {
	socket = io.connect('http://localhost:8081', {
		query: 'token=6d3c7a6c1b621bc131407150606f76d253bbcab0',
		reconnectionDelay: 0,
		reconnectionAttempts: 0,
		forceNew: true
	});
	socket.on('connect', () => {
		done();
	});
	socket.on('disconnect', () => {
	});
});

afterAll((done) => {
	// Cleanup
	if (socket.connected)
		socket.disconnect();
	server.close();
	done();
});

describe('Connection errors', function() {
	it('No token', function(done) {
		let localSocket = io.connect('http://localhost:8081', {
			reconnectionDelay: 0,
			reconnectionAttempts: 0,
			forceNew: true
		});
		expect(localSocket.connected).toEqual(false);
		done();
	});

	it('Bad token', function(done) {
		let localSocket = io.connect('http://localhost:8081', {
			query: 'token=6d3c7a6c1b621bc131407150606f76d253bbcab0',
			reconnectionDelay: 0,
			reconnectionAttempts: 0,
			forceNew: true
		});
		expect(localSocket.connected).toEqual(false);
		done();
		/* socket.emit('start', '5caa16038afe1c1c8ce91adb', function(err, logs) {
			if (err)
				console.log(err);
			console.log('I did it!', logs);
			done();
		}); */
	});
});