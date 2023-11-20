const express = require('express');
const router = express.Router();

// Define subjects for Class1
const class1Subjects = [
  { id: 'math', name: 'Mathematics' },
  { id: 'science', name: 'Science' },
  // Add more subjects as needed for Class1
];

// Define subjects for Class2
const class2Subjects = [
  { id: 'history', name: 'History' },
  { id: 'english', name: 'English' },
  // Add more subjects as needed for Class2
];

// Define topics for subjects
/*const topics = {
  math: ['algebra', 'trigonometry'], // Topics for Math
  science: ['biology', 'physics'],     // Topics for Science
  history: ['ancient history', 'modern history'],   // Topics for History
  english: ['grammar', 'literature'],   // Topics for English
};
*/

const topics = {
  math: [
    {
      name: 'algebra',
      theory: ['algebra theory 1', 'algebra theory 2'],
      practice: ['algebra practice 1', 'algebra practice 2'],
    },
    {
      name: 'trigonometry',
      theory: ['trigonometry theory 1', 'trigonometry theory 2'],
      practice: ['trigonometry practice 1', 'trigonometry practice 2'],
    },
  ],
  science: [
    {
      name: 'biology',
      theory: ['biology theory 1', 'biology theory 2'],
      practice: ['biology practice 1', 'biology practice 2'],
    },
    {
      name: 'physics',
      theory: ['physics theory 1', 'physics theory 2'],
      practice: ['physics practice 1', 'physics practice 2'],
    },
  ],
  history: [
    {
      name: 'ancient history',
      theory: ['ancient history 1', 'ancient history 2'],
      practice: ['ancient history 1', 'ancient history 2'],
    },
    {
      name: 'modern history',
      theory: ['modern history 1', 'modern history 2'],
      practice: ['modern history 1', 'modern history 2'],
    },
  ],
  english: [
    {
      name: 'grammar',
      theory: ['grammar theory 1', 'grammar theory 2'],
      practice: ['grammar practice 1', 'grammar practice 2'],
    },
    {
      name: 'literature',
      theory: ['physics theory 1', 'physics theory 2'],
      practice: ['physics practice 1', 'physics practice 2'],
    },
  ],
  // Add more subjects and their respective topics here
};


// Route to display subjects for Class1
router.get('/class1', (req, res) => {
  res.render('academic/class/class1', { subjects: class1Subjects });
});

// Route to display subjects for Class2
router.get('/class2', (req, res) => {
  res.render('academic/class/class2', { subjects: class2Subjects });
});


router.get('/class1/subject/:subjectId', (req, res) => {
  const subjectId = req.params.subjectId;
  const selectedSubject = class1Subjects.find(subject => subject.id === subjectId);
  const selectedTopics = topics[subjectId] || [];

  // Make sure to include selectedSubject and selectedTopics
  res.render('academic/class/class_topics', { subjects: class1Subjects, selectedSubject, selectedTopics });
});

router.get('/class2/subject/:subjectId', (req, res) => {
  const subjectId = req.params.subjectId;
  const selectedSubject = class2Subjects.find(subject => subject.id === subjectId);
  const selectedTopics = topics[subjectId] || [];

  // Make sure to include selectedSubject and selectedTopics
  res.render('academic/class/class_topics', { subjects: class2Subjects, selectedSubject, selectedTopics });
});

// Route to display uploaded files
router.get('/class/:class/subject/:subject/topic/:topic/files', (req, res) => {
  const { class: selectedClass, subject: selectedSubject, topic: selectedTopic } = req.params; // Changed variable name from "class"
  const directoryPath = path.join(__dirname, '../public/uploads', selectedClass, subject, topic);

  // Use the fs.readdir to get a list of files in the specified directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading the directory.');
    }

    // Render a template to display the files
    res.render('academic/class/files', { selectedClass, selectedSubject, selectedTopic, files });
  });
});
module.exports = router;
