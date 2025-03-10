class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    filter() {
      const queryObj = { ...this.queryString };
      const excludeFields = ['page', 'sort', 'limit', 'fields'];
      excludeFields.forEach((el) => {
        return delete queryObj[el];
      });
      // console.log(req.query, queryObj);
      // console.log(req.requestTime);
  
      //1B) ADVANCED FILTERING
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
        return `$${match}`;
      });
      // console.log(JSON.parse(queryStr));
      this.query = this.query.find(JSON.parse(queryStr));
  
      // let query = Tour.find(JSON.parse(queryStr));
      return this;
    }
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      // console.log(`Page: ${page}, Limit: ${limit}, Skip: ${skip}`);
      return this;
    }
  }
module.exports = APIFeatures;  