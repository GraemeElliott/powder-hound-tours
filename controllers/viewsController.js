exports.getAllTours = (req, res) => {
  res.status(200).render('all-tours', {
    title: 'All Tours',
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
