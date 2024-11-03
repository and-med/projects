var idGenerator = require('./id-generator')

var store = {
  directories: [
    {
      id: idGenerator.getNext(),
      name: 'root'
    },
    {
      id: idGenerator.getNext(),
      name: 'Documents',
      parentId: 1,
    },
    {
      id: idGenerator.getNext(),
      name: 'Music',
      parentId: 1,
    },
    {
      id: idGenerator.getNext(),
      name: 'Photos',
      parentId: 1,
    }
  ],
  notices: [
    {
      id: idGenerator.getNext(),
      directoryId: 1,
      title: 'Hello there!',
      description: 'This is a note manager application, you can create note and group it into different folders.\nYou can create subfolders too!',
      tags: ['informational'],
    },
    {
      id: idGenerator.getNext(),
      directoryId: 2,
      title: 'document.txt',
      description: 'This document contains some important data!',
      tags: ['doc'],
    },
    {
      id: idGenerator.getNext(),
      directoryId: 3,
      title: 'oasis_wonderwall.mp3',
      description: 'What an amazing piece of music the song Wonderwall is!',
      tags: ['mp3'],
    },
    {
      id: idGenerator.getNext(),
      directoryId: 4,
      title: 'picture.jpg',
      description: 'This is not an actual picture!',
      tags: ['photo'],
    }
  ]
}

module.exports = store
