w3.includeHTML();
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(() => {
  $('#btn-menu-expand').click(() => {
    $('#menu-item-expand').toggle('display')
  })
  $('#close-menu').click((e) => {
    $('#menu-item-expand').toggle('none')
  })
  
  $('.menu-item-expand .logged-in').click(() => {
    $('.menu-item-expand .member-list-group').toggle('display')
  })
  
  $('.menu-item .logged-in').click(() => {
    $('.menu-item .member-list-group').toggle('display')
  })

  $('.member-menu .list-group-item.active').prependTo('.member-menu')

  $('.member-menu .list-group-item.active').click(() => {
    console.log('click');
    
    $('.member-menu .list-group-item:not(.active)').toggle('display')
  })

  $('#signin-modal .modal-content-signin .btn-register').click(() => {
    $('#signin-modal .modal-content-signin').toggle('display')
    $('#signin-modal .modal-content-register').toggle('display')
  })

  $('#signin-modal .modal-content-register .btn-signin').click(() => {
    $('#signin-modal .modal-content-signin').toggle('display')
    $('#signin-modal .modal-content-register').toggle('display')
  })

  $('.shop-item-img-group .shop-item-img-thumbnail').click((event) => {
    const el = event.currentTarget
    $('.shop-item-img-group .shop-item-img-main').attr('src', el.getAttribute('src'))
  })


  const trainingType = getParameterByName('type')
  if (trainingType) {
    const trainingUpperCase = trainingType.replace('-', ' ').toUpperCase()
    const trainingTypeLine1 = trainingType.split('-')[0].toUpperCase()
    const trainingTypeLine2 = trainingType.split('-')[1].toUpperCase()
    const academyBookingApp = new Vue({
      el: '#academy-booking',
      data: {
        bookingList: [
        ],
        learner: 2,
        type: trainingType,
        typeLine1: trainingType.split('-')[0].toUpperCase(),
        typeLine2: trainingType.split('-')[1].toUpperCase()
      },
      methods: {
        addTraining() {
          ;
          const bookingDate = document.querySelector('#booking-date').value
          const date = new Date(bookingDate)
          const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          console.log(formatDate);

          this.bookingList.push({
            date: formatDate,
            dateText: bookingDate,
            type: trainingUpperCase,
            textLine1: trainingTypeLine1,
            textLine2: trainingTypeLine2,
            learner: this.learner,
          })
        },
        deleteTraining(index) {
          this.bookingList.splice(index, 1)
        }
      }
    })
  }


  $('#member .input-daterange').datepicker({
    format: 'd M yyyy',
    weekStart: 1,
    autoclose: true,
  });
  $('#member .input-daterange .end-date').datepicker("setDate", "11-11-2017");
  $('#member .input-daterange .end-date').datepicker("setDate", "20-11-2017");

  $('#academy-booking #booking-date').datepicker({
    format: 'd M yyyy',
    weekStart: 1,
    autoclose: true,
    todayHighlight: true,
  });

  $("#academy-booking #booking-date").datepicker("setDate", "today");

  const formBookingEl = document.querySelector("#form-booking")
  if (formBookingEl) {
    formBookingEl.addEventListener("submit", function (e) {
      document.getElementById('booking-list').value = JSON.stringify(academyBookingApp.bookingList);
      e.preventDefault();
      this.submit()
    });
  }

  // hotel
  $('#hotel #check-in, #hotel #check-out').datepicker({
    format: 'd M yyyy',
    weekStart: 1,
    autoclose: true,
  });


})
