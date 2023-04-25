$(document).ready(function () {
  const amenitiesSelect = [];
  // Check API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenitiesSelect.push($(this).parent().attr('data-name'));
    } else {
      const index = amenitiesSelect.indexOf(($(this).parent().attr('data-name')));
      if (index > -1) {
        amenitiesSelect.splice(index, 1);
      }
    }
    $('.amenities h4').text(amenitiesSelect.join(', '));
  });
});