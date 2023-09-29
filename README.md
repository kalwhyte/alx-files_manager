# File Manager

This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination and background processing.

The objective is to build a simple platform to upload and view files:

- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images

## Technologies Used

- NODEJS

  - **bull**: Redis-based queue for Node, used to create and queue jobs for processing
  - **chai-http**: Test module extension for testing http request in intergration tests
  - **express**: Light weight un-opinionated application server for node
  - **image-thumbnail**: Library for generating an image thumbnail,
  - **mime-types**: Lobrary to properly handle mime types,
  - **mongodb**: NoSQL database, allow flexible storage of data
  - **redis**: an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker
  - **sha1**: a native js function for hashing messages with the SHA-1 algorithm
  - **uuid**: For the creation of RFC4122 UUIDs

  ***

  ### During development

  - **mocha**: Test framework
  - **sinon**: For spying, stubing and many more while testing
  - **eslint**: finding and fixing problem with js code
  - **babel**: For transpiling codes to codes that are backward compatible

## Authors

[Joseph Thomas Ehigie](https://github.com/jojothomas1515) : Backend developer

[Emmanuel Ejiofor whyte](https://github.com/kalwhyte): Backend developer
