node-configure
==============

There are several configuration modules available for node.js. Each have their strengths and weaknesses, but
no one project can be considered the optimal configuration option for all use cases. Some applications have
need of complex configuration that can be fetched from a central server. Others just want a simple JSON object
loaded when the app starts.

_node-configure_ seeks to solve the problem of a single application that is being developed by a group of
developers who need the option of having a different global configuration for each developer and deployment environment,
but do not wish to utilize a complex configuration module.

The ultimate goal of _node-configure_ is a simple suite of configuration files that can be selected via the command line.

#usage

    var config = require("configure");

    console.log(config.exampleValue);


#Default Behavior

When looking for a configuration file, _node-configure_ will first utilize the config file specified by the command line
switch --config. So if your node start command was

    node app.js --config myConfig.json

_node-configure_ will attempt to load the file "myConfig.json". If _node-configure_ fails to load the file, it will
throw an exception.

If the --config switch is not included as a command line parameter, _node-configure_ will attempt to load the file
"config.json" in the current working directory (obtained via process.cwd). If that file is not found, _node-configure_
will throw an exception.

 #Changing Default Behavior

 _node-configure_ makes use of npm's
 [package-level configuration system](http://npmjs.org/doc/config.html#Per-Package-Config-Settings). If you wish to
 change the default behavior of _node-configure_ you may do so through this system. Once the configuration is set, you
 must restart _node-configure_, allowing it to make use of the changes. For example:

    npm config set configure:notFound throw

    npm restart configure


_node-configure_ supports the following npm configuration keys:

* **notFound**: specifies what _node-configure_ should do when it fails to load a configuration file. Set this value
to "throw" to cause _node-configure_ to throw an exception on a failed load. Any other value will cause _node-configure_
to return null when it fails to load a configuration file.
* **defaultConfigFile**: specifies the file _node-configure_ should attempt to load if no file is specified via
command line.
* **commandLineSwitchName**: specifies the command line switch _node-configure_ should look for to determine which
configuration file to load. Change this value if you or some other module already use --config

