/**
 * Global error handler — last middleware in the chain.
 * Logs the error server-side and returns a sanitized response to the client.
 */
const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;

  console.error(`[${statusCode}] ${err.message}${err.stack ? '\n' + err.stack : ''}`);

  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
