const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const projectRouter = express.Router();
const Project = require('../models/project_model');
const Book = require('../models/book_model');
const Document = require('../models/document_model');

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/'); // Save to 'uploads' directory
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage });

projectRouter.get('/', async (req, res) => {
    try {
      const projects = await Project.findAll({
        include: [
          {
            model: Book,
            include: [
              {
                model: Document
              }
            ]
          }
        ]
      });
      // Log the result to check the relationships
      console.log(JSON.stringify(projects, null, 2));  // Pretty-print the result
  
      res.json(projects); // Send the result back as a response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  


projectRouter.get('/:id', async (request, response) => {
    const { id } = request.params;
    const project = await Project.findByPk(id, {
        include: [
            {
              model: Book,
              include: [
                {
                  model: Document
                }
              ]
            }
          ]
    });
    if (!project) {
        return response.status(404).json({ error: 'Project was not found' });
    }
    response.status(200).json(project);
});

//Create project from scratch
projectRouter.post('/', async (request, response) => {
    const { name, description } = request.body;
  
    if (!name) {
      return response.status(400).json({ message: 'Project name is required' });
    }
  
    try {
      console.log("Creating project with name:", name);
      console.log("Project description:", description); // Log the description
  
      const newProject = await Project.create({
        name: name,
        description: description || 'No description provided', // Use a default if description is not provided
      });
  
      return response.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      return response.status(500).json({ message: 'Error creating project', error });
    }
  });
  
//Create project from existing one/uploaded file
projectRouter.post('/:id/uploadCSV', upload.single('file'), async (request, response) => {
    const { id } = request.params;
    const file = request.file;

    if (!file) {
        return response.status(400).json({ message: 'No file uploaded' });
    }

    const project = await Project.findByPk(id);
    if (!project) {
        return response.status(404).json({ message: 'Project not found' });
    }

    // Read and process the CSV file
    const filePath = file.path;
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const rows = fileContent.split('\n');
    const headers = rows[0].split(',');

    const booksData = [];
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row.length < headers.length) continue; // Skip incomplete rows

        const bookData = {
            bookName: row[headers.indexOf('title')],
            bookDescription: row[headers.indexOf('description')],
            documentName: row[headers.indexOf('documentName')],
            documentType: row[headers.indexOf('documentType')],
        };
        booksData.push(bookData);
    }

    // Insert books and documents into the database
    for (let bookData of booksData) {
        const { bookName, bookDescription, documentName, documentType } = bookData;

        const book = await Book.create({
            name: bookName,
            description: bookDescription || 'No description provided',
            project_id: id,
            file_path: filePath,
        });

        if (documentName) {
            await Document.create({
                name: documentName,
                type: documentType,
                book_id: book.id,
                project_id: id,
            });
        }
    }

    // Clean up uploaded file (optional)
    fs.unlinkSync(filePath);

    response.status(201).json({ message: 'CSV file processed successfully' });
});

projectRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    const project = await Project.findByPk(id, {
        include: [{ model: Book, include: [Document] }]
    });

    if (!project) {
        return response.status(404).json({ message: 'Project not found' });
    }

    // Delete associated books and documents first
    for (const book of project.Books) {
        await Document.destroy({ where: { book_id: book.id } });
        await Book.destroy({ where: { id: book.id } });
    }

    // Delete the project itself
    await Project.destroy({ where: { id } });

    response.status(200).json({ message: 'Project deleted successfully' });
});

module.exports = projectRouter;
