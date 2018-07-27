const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;

const caseSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    trim: true,
    required: 'Please enter a case title.'
  },
  caseHeroImg: {},
  caseInfo: Array,
  caseVideo: {},
  casePics: Array,
  description: {
    type: String,
    required: 'Please fill in a case description'
  },
  order: Number
});

caseSchema.plugin(autoIncrement.plugin, {
  model: 'Case',
  field: 'caseId',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Case', caseSchema);
