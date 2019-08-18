class APIFeatures {
  constructor(query, queryStringFeature) {
    this.query = query;
    this.queryStringFeature = queryStringFeature;
  }

  filter() {

    // Filtering
    const queryObject = { ...this.queryStringFeature };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach (element => delete queryObject[element]);
    
    //Advanced filtering
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryStringFeature.sort) {
      const sortBy = this.queryStringFeature.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryStringFeature.fields) {
      const fields = this.queryStringFeature.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryStringFeature.page * 1 || 1;
    const limit = this.queryStringFeature.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }


}

module.exports = APIFeatures;