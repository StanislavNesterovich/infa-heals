const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
  },
  platformId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = {
  Report,
};
