/**
 * Success response handler
 */
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

/**
 * Error response handler
 */
const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  return res.status(statusCode).json(response);
};

/**
 * Validation error response
 */
const validationErrorResponse = (res, errors) => {
  return errorResponse(res, 'Validation failed', 400, errors);
};

/**
 * Unauthorized response
 */
const unauthorizedResponse = (res, message = 'Unauthorized access') => {
  return errorResponse(res, message, 401);
};

/**
 * Forbidden response
 */
const forbiddenResponse = (res, message = 'Access forbidden') => {
  return errorResponse(res, message, 403);
};

/**
 * Not found response
 */
const notFoundResponse = (res, message = 'Resource not found') => {
  return errorResponse(res, message, 404);
};

/**
 * Conflict response
 */
const conflictResponse = (res, message = 'Resource conflict') => {
  return errorResponse(res, message, 409);
};

/**
 * Rate limit response
 */
const rateLimitResponse = (res, message = 'Too many requests') => {
  return errorResponse(res, message, 429);
};

/**
 * Pagination helper
 */
const getPaginationData = (page, limit, total) => {
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;
  const totalPages = Math.ceil(total / itemsPerPage);
  const skip = (currentPage - 1) * itemsPerPage;
  
  return {
    currentPage,
    itemsPerPage,
    totalPages,
    total,
    skip,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null
  };
};

/**
 * Paginated response
 */
const paginatedResponse = (res, data, pagination, message = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
    timestamp: new Date().toISOString()
  });
};

/**
 * Format response data with metadata
 */
const formatResponseData = (data, metadata = {}) => {
  return {
    ...data,
    _metadata: {
      ...metadata,
      timestamp: new Date().toISOString()
    }
  };
};

/**
 * Handle async errors
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Transform model data for API response
 */
const transformModelData = (model, excludeFields = []) => {
  if (!model) return null;
  
  const data = model.toObject ? model.toObject() : model;
  
  // Remove excluded fields
  excludeFields.forEach(field => {
    delete data[field];
  });
  
  // Remove MongoDB version field
  delete data.__v;
  
  return data;
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
  rateLimitResponse,
  getPaginationData,
  paginatedResponse,
  formatResponseData,
  asyncHandler,
  transformModelData
};