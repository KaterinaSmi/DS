const Project = require('./project_model');
const Book = require('./book_model');
const Document = require('./document_model');

// Set up the associations
const setupAssociations = () => {
  // Project has many Books
  Project.hasMany(Book, {
    foreignKey: 'project_id',
    as: 'books', // Alias for accessing books in a project
  });

  // Book belongs to Project
  Book.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project', // Alias for accessing project of a book
  });

  // Book has many Documents
  Book.hasMany(Document, {
    foreignKey: 'book_id',
    as: 'documents', // Alias for accessing documents in a book
  });

  // Document belongs to Book
  Document.belongsTo(Book, {
    foreignKey: 'book_id',
    as: 'book', // Alias for accessing book of a document
  });
};

module.exports = setupAssociations;
