const express = require('express')
const router = express.Router()

const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

const moment = require('moment');

// Add your routes here - above the module.exports line

// Code supplied by Gary for dealing with query strings
router.use(function(req, res, next){
  Object.assign(res.locals,{
    postData: (req.body ? req.body : false)
  });

  Object.assign(res.locals,{
    getData: (req.query ? req.query : false)
  });

  next();
});

var path = require('path')

// Data sources
router.all('/data/:data/source/:source', (req, res) => {
  const { data, source } = req.params
  res.json(require(`./data/${data}/source/${source}`))
})


// Adding the moment plug in for Claim Date screen
router.get('/*/claimdate', function (req, res, next) {
  var ssp = req.session.data['ssp-dob-year'] + '-' +req.session.data['ssp-dob-month'] + '-' + req.session.data['ssp-dob-day'];
  ssp = moment(ssp, 'YYYY-MM-DD');
  
  var recent = req.session.data['ssp-recent-dob-year'] + '-' +req.session.data['ssp-recent-dob-month'] + '-' + req.session.data['ssp-recent-dob-day'];
  recent = moment(recent, 'YYYY-MM-DD');
  
  var last = req.session.data['last-dob-year'] + '-' +req.session.data['last-dob-month'] + '-' + req.session.data['last-dob-day'];
  last = moment(last, 'YYYY-MM-DD');
  
  var dateToShow, whichDate;
  if (last.isValid() && req.session.data['self-employed'] == 'mines') {
    whichDate = 'lastWorked';
    dateToShow = last;
  }

  if(recent.isValid()) {
    whichDate = 'sspRecent';
    dateToShow = recent;
  }

  if(ssp.isValid()) {
    whichDate = 'ssp';
    dateToShow = ssp;
  }

  if(dateToShow > moment().subtract(3, 'months')) {
    dateToShow.add(1, 'days');
    res.locals.dateToShow = dateToShow.format('D MMMM YYYY');
    res.locals.whichDate = whichDate;
  } else {
    res.locals.whichDate = whichDate;
    res.locals.date3monthsAgo = moment().subtract(3, 'months').add(1, 'days').format('D MMMM YYYY')
  }

  next();
})

// Adding the moment plug in for the fit for work screen
router.get('/*/fit-for-work', function (req, res, next) {
  var ssp = req.session.data['ssp-dob-year'] + '-' +req.session.data['ssp-dob-month'] + '-' + req.session.data['ssp-dob-day'];
  ssp = moment(ssp, 'YYYY-MM-DD');
  
  var recent = req.session.data['ssp-recent-dob-year'] + '-' +req.session.data['ssp-recent-dob-month'] + '-' + req.session.data['ssp-recent-dob-day'];
  recent = moment(recent, 'YYYY-MM-DD');
  
  var last = req.session.data['last-dob-year'] + '-' +req.session.data['last-dob-month'] + '-' + req.session.data['last-dob-day'];
  last = moment(last, 'YYYY-MM-DD');
  
  var dateToShow, whichDate;
  if (last.isValid() && req.session.data['self-employed'] == 'mines') {
    whichDate = 'lastWorked';
    dateToShow = last;
  }

  if(recent.isValid()) {
    whichDate = 'sspRecent';
    dateToShow = recent;
  }

  if(ssp.isValid()) {
    whichDate = 'ssp';
    dateToShow = ssp;
  }

  if(dateToShow > moment().subtract(3, 'months')) {
    dateToShow.add(1, 'days');
    res.locals.dateToShow = dateToShow.format('D MMMM YYYY');
    res.locals.whichDate = whichDate;
  } else {
    res.locals.whichDate = whichDate;
    res.locals.date3monthsAgo = moment().subtract(3, 'months').add(1, 'days').format('D MMMM YYYY')
  }

  next();
})

// Adding the moment plug in for List screen
router.get('/*/list', function (req, res, next) {
  var ssp = req.session.data['ssp-dob-year'] + '-' +req.session.data['ssp-dob-month'] + '-' + req.session.data['ssp-dob-day'];
  ssp = moment(ssp, 'YYYY-MM-DD');
  
  var recent = req.session.data['ssp-recent-dob-year'] + '-' +req.session.data['ssp-recent-dob-month'] + '-' + req.session.data['ssp-recent-dob-day'];
  recent = moment(recent, 'YYYY-MM-DD');
  
  var last = req.session.data['last-dob-year'] + '-' +req.session.data['last-dob-month'] + '-' + req.session.data['last-dob-day'];
  last = moment(last, 'YYYY-MM-DD');
  
  var dateToShow, whichDate;
  if (last.isValid() && req.session.data['self-employed'] == 'mines') {
    whichDate = 'lastWorked';
    dateToShow = last;
  }

  if(recent.isValid()) {
    whichDate = 'sspRecent';
    dateToShow = recent;
  }

  if(ssp.isValid()) {
    whichDate = 'ssp';
    dateToShow = ssp;
  }

  if(dateToShow > moment().subtract(3, 'months')) {
    dateToShow.add(1, 'days');
    res.locals.dateToShow = dateToShow.format('D MMMM YYYY');
    res.locals.whichDate = whichDate;
  } else {
    res.locals.whichDate = whichDate;
    res.locals.date3monthsAgo = moment().subtract(3, 'months').add(1, 'days').format('D MMMM YYYY')
  }

  next();
})

// Code from Steven for dealing with variables on list page

router.get('/apply/v9/list', (req, res, next) => {

  if (!req.session.sectionStatus){
    // console.log('no session');
    req.session.sectionStatus = {
      // cwyn: 'complete',
      yourhealth: undefined,
      paidwork: undefined,
      ssp: undefined,
      voluntarywork: undefined,
      pension: undefined,
      insurance: undefined,
      yourdetails: undefined,
      // submitted: undefined,
    }
  }

  if (req.query.yourhealth) {
    req.session.sectionStatus.yourhealth = req.query.yourhealth
  };
  if (req.query.paidwork) {
    req.session.sectionStatus.paidwork = req.query.paidwork
  };
  if (req.query.ssp) {
    req.session.sectionStatus.ssp = req.query.ssp
  };
  if (req.query.voluntarywork) {
    req.session.sectionStatus.voluntarywork = req.query.voluntarywork
  };
  if (req.query.pension) {
    req.session.sectionStatus.pension = req.query.pension
  };
  if (req.query.insurance) {
    req.session.sectionStatus.insurance = req.query.insurance
  };
  if (req.query.yourdetails) {
    req.session.sectionStatus.yourdetails = req.query.yourdetails
  };
  if (req.query.submitted) {
    req.session.sectionStatus.submitted = req.query.submitted
  };

  res.render('apply/v9/list.html', {sectionStatus: req.session.sectionStatus});
});


// Clear data on the 'application cancelled' screen

router.get('/*/clear-v9', function (req, res) {
  req.session.destroy()
  res.render('apply/v9/application-cancelled')
})



// Page routing
router.get('*', function (req, res, next) {
  if (req.params[0].substr(-1) == '/') res.locals.path = req.params[0].slice(0,-1).substr(1);
  else res.locals.path = path.dirname(req.params[0]).substr(1);
  next();
})


// if postcode is in Wales, show the contact preference questions - v15
router.post('/welsh-or-not-15', function (req, res) {

  const welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/v15/language-preference-writing')
  } else {
    res.redirect('/apply/v15/telephone')
  }
})

// if postcode is in Wales, show the contact preference questions - v16
router.post('/welsh-or-not-16', function (req, res) {

  var welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/v16/language-preference-writing');
    
  } else {
    res.redirect('/apply/v16/telephone')
  }
})

// if postcode is in Wales, show the contact preference questions - v17
router.post('/welsh-or-not-17', function (req, res) {

  const welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/v17/language-preference-writing')
  } else {
    res.redirect('/apply/v17/telephone')
  }
})

// if postcode is in Wales, show the contact preference questions - v18
router.post('/welsh-or-not-18', function (req, res) {

  const welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/v18/language-preference-writing')
  } else {
    res.redirect('/apply/v18/telephone')
  }
})

// if postcode is in Wales, show the contact preference questions - Live
router.post('/welsh-or-not', function (req, res) {

  const welsh = req.session.data['address-postcode']

  if (welsh == 'wales' ) {
    res.redirect('/apply/live/language-preference-writing')
  } else {
    res.redirect('/apply/live/telephone')
  }
})

// if claim start date is more than 3 months ago, take them to Are you sure page - if using for research change '1'. For example, it's December so you need to addd all months before September.

router.post('/apply/v16/claimdate', function (req, res) {

  const claimMonth = req.session.data['claim-month']

  if (claimMonth == '1') {
    res.redirect('/apply/v16/late-claim')
  } else {
    res.redirect('/apply/v16/claim-end-date')
  }
})

router.post('/apply/v17/claimdate', function (req, res) {

  const claimMonth = req.session.data['claim-month']

  if (claimMonth == '1') {
    res.redirect('/apply/v17/late-claim')
  } else {
    res.redirect('/apply/v17/claim-end-date')
  }
})

router.post('/apply/live/claimdate', function (req, res) {

  const claimMonth = req.session.data['claim-month']

  if (claimMonth == '1') {
    res.redirect('/apply/live/late-claim')
  } else {
    res.redirect('/apply/live/claim-end-date')
  }
})

// alt format version 2

router.post('/apply/v18/alt-formats-2/what-alt-format', function (req, res) {

  const altFormat = req.session.data['alt-format']

  if (altFormat == 'large-print') {
    res.redirect('/apply/v18/alt-formats-2/which-font-size')
  } 
  if (altFormat == 'something-else') {
    res.redirect('/apply/v18/alt-formats-2/what-how-alt')
  } 
  
  else {
    res.redirect('/apply/v18/alt-formats-2/which-font-size')
  }
})

// alt format version 3

router.post('/apply/v18/alt-formats-3/what-alt-format', function (req, res) {

  const altFormat = req.session.data['alt-format']

  if (altFormat == 'large-print') {
    res.redirect('/apply/v18/alt-formats-3/which-font-size')
  } 
  if (altFormat == 'something-else') {
    res.redirect('/apply/v18/alt-formats-3/alt-format-list')
  } 
  
  else {
    res.redirect('/apply/v18/alt-formats-3/which-font-size')
  }
})

router.post('/apply/v18/alt-formats-3/alt-format-list', function (req, res) {

  const altFormat = req.session.data['alt-format-list']

  if (altFormat == 'other') {
    res.redirect('/apply/v18/alt-formats-3/what-how-alt')
  } 
  
  else {
    res.redirect('/apply/v18/alt-formats-3/address')
  }
})


module.exports = router
