$(document).ready(function () {
  const url = 'http://localhost:5001/api/v1/';
  $.get(url + 'status/', (data, status) => {
    if (status === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });

  const amenitiesSelect = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenitiesSelect[$(this).parent().attr('data-id')] = $(this).parent().attr('data-name');
    } else {
      delete amenitiesSelect[$(this).parent().attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenitiesSelect).join(', '));
  });

  const search = (jsonBody = {}) => {
    $.ajax({
      url: url + 'places_search/',
      type: 'POST',
      data: JSON.stringify(jsonBody),
      contentType: 'application/json ',
      success: (places) => {
        $('section.places').empty();
        for (const place of places) {
          $('section.places').append(`\
              <article>\
                <div class="title_box">\
                  <h2>${place.name}</h2>\
                  <div class="price_by_night">$${place.price_by_night}</div>\
                </div>\
                <div class="information">\
                  <div class="max_guest">
                    ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}\
                  </div>\
                  <div class="number_rooms">
                    ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}\
                  </div>\
                  <div class="number_bathrooms">
                    ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}\
                  </div>\
                </div>\
                <div class="description">${place.description}</div>\
              </article>\
            `);
        }
      }
    });
  };

  $('#search').click(() => {
    const filters = {
      amenities: Object.keys(amenitiesSelect)
    };
    search(filters);
  });

  search();
});
