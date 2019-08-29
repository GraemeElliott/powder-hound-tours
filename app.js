const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utilities/appError');
const errorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Security HTTP Header
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests
const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests from this IP. Please try again in one hour',
});

app.use('/api', limiter);

// Body Parser
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against NoSQL Query injections
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: [
    'duration', 'ratingsQty', 'ratingsAvg:', 'maxGroupSize', 'difficulty', 'price',
  ],
}));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError (`Can't find ${req.originalUrl} on this server`, 400));
});

app.use(errorHandler);

module.exports = app;
