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


function formatDate(string) {
  const date = new Date(string)
  return date.toISOString().split('T')[0]
}

function bindMenubar() {
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
}

$(document).ready(() => {
  bindMenubar()

  const trainingType = getParameterByName('type')
  if (trainingType) {
    const trainingUpperCase = trainingType.replace('-', ' ').toUpperCase()
    const trainingTypeLine1 = trainingType.split('-')[0].toUpperCase()
    const trainingTypeLine2 = trainingType.split('-')[1].toUpperCase()
    const academyBookingApp = new Vue({
      el: '#academy-booking',
      mounted: () => {
        bindMenubar()
      },
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
          const bookingDate = document.querySelector('#booking-date').value
          const formatDate = new Date(bookingDate).toISOString().split('T')[0]

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


  //hotel search
  $('#form-hotel-search').submit(function(event) {
    // event.preventDefault()
    const $checkIn = $(this).find("input[name=check-in]")
    $checkIn.val(formatDate($checkIn.val()))

    const $checkOut = $(this).find("input[name=check-out]")
    $checkOut.val(formatDate($checkOut.val()))
  })

  //hotel book
  $('#form-hotel-search .room-list button[type=submit]').click(function(event) {
    // event.preventDefault()
    const $btn = $(this)
    const roomId = $btn.attr('data-room-id')
    const $inputRoomId = $("#form-hotel-search input[name=room-id]")
    const $formHotel = $('#form-hotel-search')
    $formHotel.attr('action', $formHotel.attr('data-booking-action'))
    $inputRoomId.val(roomId)
    
  })

  // hotel gallery
  function changeActiveImage(imgElment) {
    $(".gallery .img-thumbnails img.active").removeClass('active')
    imgElment.classList.add('active')
    const dataImg = imgElment.getAttribute('data-image')
    $('.gallery .img-active').attr('src', dataImg)
  }
  
  $(".gallery .arrow-right").click(function(event) {
    const nextImg = $(".gallery .img-thumbnails img.active").next()[0]
    if (nextImg) {
      changeActiveImage(nextImg)
    } else {
      changeActiveImage($(".gallery .img-thumbnails img").first()[0])
    }
  })

  $(".gallery .arrow-left").click(function (event) {
    const nextImg = $(".gallery .img-thumbnails img.active").prev()[0]
    if (nextImg) {
      changeActiveImage(nextImg)
    } else {
      changeActiveImage($(".gallery .img-thumbnails img").last()[0])
    }
  })


  // copy data to modal when click room image
  $('.room-item .room-img').click(function(event) {
    $('.hotel-gallery-modal').modal()
    //delete exist info
    $('.hotel-gallery-modal .text-wrapper').empty()
    $('.hotel-gallery-modal .img-thumbnails').empty()

    
    //append new info
    $roomItem = $(this).closest('.room-item')
    $imgThumbnails = $roomItem.find('.room-info-modal-images img').clone()
    let activeImage
    $imgThumbnails.each((index, el) => {
      if (index === 0) {
        el.classList.add('active')
        activeImage = el
      }

      const imgSrc = el.getAttribute('data-thumbnail')
      el.setAttribute('src', imgSrc)
      $('.hotel-gallery-modal .img-thumbnails').append(el)
    })
    
    $('.hotel-gallery-modal .img-active').attr('src', activeImage.getAttribute('src'))
    
    const roomInfo = $roomItem.find('.text-desc-container').clone()
    const roomTitle = $roomItem.find('.title').clone()
    
    $('.hotel-gallery-modal .text-wrapper').append(roomInfo)
    $('.hotel-gallery-modal .text-desc-container').prepend(roomTitle)

    $(".gallery .img-thumbnails img").click(function (event) {
      const el = event.currentTarget
      changeActiveImage(el)
    })

    
  })

})
