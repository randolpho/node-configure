// Prevents us from using variables before declaring them.
"use strict";

var npmOptions = {cwd : "..\\..\\"};

// commands to set up npm config state for default test run
var setupCommands = [
    { cmd : "npm config set configure:notFound throw", opts : npmOptions },
    { cmd : "npm config set configure:defaultConfigFile config.json", opts : npmOptions },
    { cmd : "npm config set configure:commandLineSwitchName config", opts : npmOptions },
    { cmd : "npm restart configure", opts : npmOptions }
];

// commands to set up npm config state for alternate test run
var altSetupCommands = [
    { cmd : "npm config set configure:notFound nope", opts : npmOptions },
    { cmd : "npm config set configure:defaultConfigFile config2.json", opts : npmOptions },
    { cmd : "npm config set configure:commandLineSwitchName config2", opts : npmOptions },
    { cmd : "npm restart configure", opts : npmOptions }
];

// commands to revert npm config state to default
var cleanupCommands = [
    { cmd : "npm config set configure:notFound throw", opts : npmOptions },
    { cmd : "npm config set configure:defaultConfigFile config.json", opts : npmOptions },
    { cmd : "npm config set configure:commandLineSwitchName config", opts : npmOptions },
    { cmd : "npm restart configure", opts : npmOptions }
];

// default test run commands
var testCommands = [
    { cmd : "node test.js --config cmd.config.json", opts : {cwd : "test/readsConfigFromCommandLine" }},
    { cmd : "node test.js", opts : {cwd : "test/readsDefaultConfig" }},
    { cmd : "node test.js --config notThere.json", opts : {cwd : "test/throwsOnMissingCommandLineConfig" }},
    { cmd : "node test.js", opts : {cwd : "test/throwsOnMissingDefaultConfig" }}
];

// alternate test run commands
var altTestCommands = [
    { cmd : "node test.js --config2 cmd2.config.json", opts : {cwd : "test/alternate/readsConfigFromCommandLine" }},
    { cmd : "node test.js", opts : {cwd : "test/alternate/readsDefaultConfig" }},
    { cmd : "node test.js --config2 notThere.json", opts : {cwd : "test/alternate/returnsNullOnMissingCommandLineConfig" }},
    { cmd : "node test.js", opts : {cwd : "test/alternate/returnsNullOnMissingDefaultConfig" }}
];

var cp = require("child_process");

function runCommand(commandList, noneLeft, showOutput) {
    var cmd = commandList.shift();
    if(!cmd) {
        noneLeft();
        return;
    }
    cp.exec(cmd.cmd, cmd.opts, function(error, stdout) {
        if(error) {
            console.error("Error executing command: ", cmd);
            throw new Error(error);
        }
        if(showOutput) {
            console.log(stdout);
        }
        runCommand(commandList, noneLeft, showOutput);
    });
}

function start() {
    console.log("Preparing for default tests.");
    runCommand(setupCommands, runTests, false)
}

function done() {
    console.log("Testing complete!");
}

function runTests() {
    console.log("Executing default tests:");
    console.log("");
    runCommand(testCommands, altSetup, true);
}

function altSetup() {
    console.log("Preparing for alternate package config tests...");
    runCommand(altSetupCommands, altTests, false);
}

function altTests() {
    console.log("Executing alternate package config tests:");
    console.log("");
    runCommand(altTestCommands, cleanup, true);
}

function cleanup() {
    console.log("Cleaning up package config...");
    runCommand(cleanupCommands, done, false);
}

start();