/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// Autocomplete
// var autocomplete = document.querySelector('[data-source]')
// if (autocomplete) {
//   accessibleAutocomplete.enhanceSelectElement({
//     // showNoOptionsFound: false;
//     defaultValue: '',
//     selectElement: autocomplete
//   })
// }