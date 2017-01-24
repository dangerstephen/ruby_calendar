var initialize_calendar;
initialize_calendar = function() {
  $('.calendar').each(function(){
    var calendar = $(this);
    calendar.fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: '/meals.json',

      select: function(start, end) {
        $.getScript('/meals/new', function() {
          $('#meal_date_range').val(moment(start).format("MM/DD/YYYY HH:mm") + ' - ' + moment(end).format("MM/DD/YYYY HH:mm"))
          date_range_picker();
          $('.start_hidden').val(moment(start).format('YYYY-MM-DD HH:mm'));
          $('.end_hidden').val(moment(end).format('YYYY-MM-DD HH:mm'));
        });

        calendar.fullCalendar('unselect');
      },

      eventDrop: function(meal, delta, revertFunc) {
        meal_data = {
          meal: {
            id: meal.id,
            start: meal.start.format(),
            end: meal.end.format()
          }
        };
        $.ajax({
            url: meal.update_url,
            data: meal_data,
            type: 'PATCH'
        });
      },

      eventClick: function(meal, jsEvent, view) {
        $.getScript(meal.edit_url, function() {
          $('#meal_date_range').val(moment(meal.start).format("MM/DD/YYYY HH:mm") + ' - ' + moment(meal.end).format("MM/DD/YYYY HH:mm"))
          date_range_picker();
          $('.start_hidden').val(moment(meal.start).format('YYYY-MM-DD HH:mm'));
          $('.end_hidden').val(moment(meal.end).format('YYYY-MM-DD HH:mm'));
        });
      }
    });
  })
};
$(document).on('turbolinks:load', initialize_calendar);
