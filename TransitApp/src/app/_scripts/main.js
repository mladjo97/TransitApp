/*
 * Author: Mladen Milosevic
 * Date: 30.05.2019
 */

$(document).ready(function() {

    // init daterange picker for pricelist
    $('input[name="pricelist_range"]').daterangepicker({
        opens: 'right',
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'), 10),
        locale: {
            format: 'DD/MM/YYYY'
        }
      }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('DD/MM/YYYY') + ' to ' + end.format('DD/MM/YYYY'));
      });

    // init datetime picker for registration
    $('input[name="birthday"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10),
        locale: {
            format: 'DD/MM/YYYY'
        }
      }, function(start, end, label) {
         // da datum bude lepsi
         var dt = new Date(Date.parse(start));
         let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
         let formattedStart = dt.toLocaleString("en-GB", options);
      });
});

function initDatePicker() {
    // init datetime picker
    $('input[name="birthday"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10),
        locale: {
            format: 'DD/MM/YYYY'
        }
    }, function(start, end, label) {
        // da datum bude lepsi
        var dt = new Date(Date.parse(start));
        let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        let formattedStart = dt.toLocaleString("en-GB", options);
    });
}

function initDateRange(){
    // init daterange picker for pricelist
    $('input[name="pricelist_range"]').daterangepicker({
        opens: 'right',
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'), 10),
        locale: {
            format: 'DD/MM/YYYY'
        }
      }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('DD/MM/YYYY') + ' to ' + end.format('DD/MM/YYYY'));
      });
}

function getDate() {
    var dt = new Date(Date.parse( $('input[name="birthday"]').data('daterangepicker').startDate));
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    let formattedStart = dt.toLocaleString("en-GB", options);
    return formattedStart;
}

function getStartRange() {
    var dt = new Date(Date.parse( $('input[name="pricelist_range"]').data('daterangepicker').startDate));
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    let formattedStart = dt.toLocaleString("en-GB", options);
    return formattedStart;
}

function getEndRange() {
    var dt = new Date(Date.parse( $('input[name="pricelist_range"]').data('daterangepicker').endDate));
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    let formattedStart = dt.toLocaleString("en-GB", options);
    return formattedStart;
}

function setDate(date){
    // init datetime picker
    $('input[name="birthday"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        startDate: date,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10),
        locale: {
            format: 'DD/MM/YYYY'
        }
      }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('DD/MM/YYYY') + ' to ' + end.format('DD/MM/YYYY'));
      });
}

function setRangeDates(startDateParam, endDateParam){
    // init datetime picker
    $('input[name="pricelist_range"]').daterangepicker({
        startDate: startDateParam,
        endDate: endDateParam,
        opens: 'right',
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'), 10),
        locale: {
            format: 'DD/MM/YYYY'
        }
      }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('DD/MM/YYYY') + ' to ' + end.format('DD/MM/YYYY'));
      });
}
