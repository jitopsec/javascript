/**
com/jitopsec/Out.js: a module of classes representing package

This module defines classes within the com.jitopsec.Out namespace

**/

var com;

if(!com) com={};
else if(typeof com != 'object') 
	throw new Error("com already exists and com is not an object");

if(!com.jitopsec) com.jitopsec={};
else if(typeof com.jitopsec != 'object')
	throw new Error("com.jitopsec already exists and com.jitopsec is not an object");

if(com.jitopsec.Out)
	throw new Error("com.jitopsec.Out already exists");

com.jitopsec.Out={
	println:function(m){ document.write(m+'<br>');}
};
