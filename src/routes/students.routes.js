const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/students.controller');
const upload= require('../config/upload.config')


router.post('/', upload.single('photo'), studentCtrl.addStudent);
router.get('/', studentCtrl.getAllStudents);
router.get('/:id', studentCtrl.getStudentById);
router.put('/:id', upload.single('photo'), studentCtrl.updateStudent);
router.delete('/:id', studentCtrl.deleteStudent);

module.exports = router;