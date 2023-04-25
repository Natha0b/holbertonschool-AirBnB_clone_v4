$(document).ready(function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, (data, status) => {
    if (status === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });
  const amenitiesSelect = [];
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
