// errorHandling.js

export function errorHandling(err, req, res, next) {
    // Xatoni logga yozish
    console.error(err.stack);
  
    // Xatoni qaytarish
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
      error: err.message, // Ixtiyoriy: xatolik haqida batafsil ma'lumot
    });
  }
  
  module.exports = errorHandling;
  