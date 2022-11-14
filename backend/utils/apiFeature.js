class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log("keyword", keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const querycopy = { ...this.queryString };
    const removavleFields = ["keyword", "limit", "page"];
    removavleFields.forEach((key) => delete querycopy[key]);
    //FILTER FOR PRICE AND RATING
    let queryString = JSON.stringify(querycopy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  pagination(resultPerpage) {
    const currentpage = Number(this.queryString.page) || 1;
    const skip = resultPerpage * (currentpage - 1);
    this.query = this.query.limit(resultPerpage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
