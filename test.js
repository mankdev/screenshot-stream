'use strict';

var concat = require('concat-stream');
var imageSize = require('image-size');
var screenshot = require('./');
var test = require('ava');

test('crop image using the `crop` option', function (t) {
	t.plan(2);

	var stream = screenshot('http://yeoman.io', '1024x768', {
		crop: true,
		hello: true
	});

	stream.pipe(concat(function (data) {
		t.assert(imageSize(data).width === 1024);
		t.assert(imageSize(data).height === 768);
	}));
});

test('capture a DOM element using the `selector` option', function (t) {
	t.plan(2);

	var stream = screenshot('http://yeoman.io', '1024x768', {
		selector: '.page-header'
	});

	stream.pipe(concat(function (data) {
		t.assert(imageSize(data).width === 1024);
		t.assert(imageSize(data).height === 80);
	}));
});

test('auth using the `username` and `password` options', function (t) {
	t.plan(1);

	var stream = screenshot('http://httpbin.org/basic-auth/user/passwd', '1024x768', {
		username: 'user',
		password: 'passwd'
	});

	stream.on('data', function (data) {
		t.assert(data.length);
	});
});

test('have a `delay` option', function (t) {
	t.plan(2);

	var now = new Date();
	var stream = screenshot('http://yeoman.io', '1024x768', {
		delay: 2
	});

	stream.on('data', function (data) {
		t.assert((new Date()) - now > 2000);
	});
});