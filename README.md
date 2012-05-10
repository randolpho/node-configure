node-configure
==============

There are several configuration modules available for node.js. Each have their strengths and weaknesses, but no one project can be considered the optimal configuration option for all use cases. Some applicaitons have need of complex configuration that can be fetched from a central server. Others just want a simple JSON object loaded when the app starts. 

_node-configure_ seeks to solve the problem of a single application that is being developed by a group of developers who do not need complex configuration, but who do need the option of having a different configuration for each developer and deployment environment. The ultimate goal of _node-configure_ is a simple suite of configurations that can be selected from the command line. 