document.addEventListener("DOMContentLoaded", function(event) {

  $(function() {
    $('.form-control.date').datepicker({ dateFormat: 'yy-mm-dd' });      // 날짜 선택기를 적용한다
  });
});
