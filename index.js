$(function () {
  var INDEX = 0;
  answers = []
  $("#chat-submit").click(function (e) {
    e.preventDefault()
    message()
  })
  function message(val1) {

    var msg = $("#chat-input").val();
    if (msg.trim() == '' && !val1) {
      return false;
    }
    msg = msg.trim() ? msg : val1
    generate_message(msg, 'self');
    answers.push(msg)
    setTimeout(function () {
      ask_question(msg, INDEX);

    }, 1000)
  }
  function ask_question(msj, INDEX) {
    type = 'user'
    questions = { '1': ['Məşğuliyyətiniz ?'], '2': ['Son təhsiliniz:', 'Cari təhsiliniz:'], '3': ['Aşağıdakılardan hansı sizə uyğundur?', 'TQDK Bakalavr  qəbul balınızı daxil edin', 'TQDK Bakalavr və magistratua qəbul balınızı daxil edin'], '4': ['Məntiq testimiz də istirak istəyərmiydiniz ?'] }
    options = { '1': ['Təhsil alıram', 'Çalışıram', 'İşsiz', 'Təhsil alıram və çalışıram'], '2': ['Orta təhsil', 'Peşə təhsili', 'Bakalavr', 'magistratura', 'Phd'], '3': ['Əlaçıyam ', 'Zərbəçiyım', 'Olimpiada qalibiyəm', 'Heç biri'], '4': ['Bəli', 'Xeyir'], '5': [`Iştirak etdiyiniz üçün çox sağolun sizin nəticəniz ${67}%-dir`, `Bu linkə daxil olub məntiq testimizdə iştirak edə bilərsiniz www.qss.mentiq.az`] }
    console.log(msj, questions[INDEX]);
    var str = "";
    let link_pattern = 'www.*'
    if (INDEX === 1 || INDEX === 2) {
      str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img src=\"default_avatar.png\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      str += answers[1] !== 'Təhsil alıram' ? questions[INDEX][0] : questions[INDEX][1];
      str += "          <\/div>";
      str += "        <\/div>";
      str += "        <div class=\"tags\">";
      for (let i = 0; i < options[INDEX].length; i++) {
        str += `        <div class=\"tag ${i} \">${options[INDEX][i]}<\/div>`;
      }
      str += "       <\/div>";
    }
    else if (INDEX === 3) {
      str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img src=\"default_avatar.png\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      if (msj === 'Orta təhsil' || msj === 'Peşə təhsili') {
        str += questions[INDEX][0];
      }
      else if (msj == 'Bakalavr') {
        str += questions[INDEX][1];
      }
      else {
        str += questions[INDEX][2];
      }
      str += "          <\/div>";
      str += "        <\/div>";
      if (msj === 'Orta təhsil' || msj === 'Peşə təhsili') {
        str += "        <div class=\"tags\">";

        for (let i = 0; i < options[INDEX].length; i++) {
          str += `        <div class=\"tag ${i} \">${options[INDEX][i]}<\/div>`;
        }
        str += "       <\/div>";
      }
    }
    else if (INDEX === 4) {
      str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img src=\"default_avatar.png\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      str += questions[INDEX][0];
      str += "          <\/div>";
      str += "        <\/div>";
      str += "        <div class=\"tags\">";
      for (let i = 0; i < options[INDEX].length; i++) {
        str += `        <div class=\"tag ${i} \">${options[INDEX][i]}<\/div>`;
      }
      str += "       <\/div>";
    }
    else {
      str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img src=\"default_avatar.png\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      if (msj === 'Bəli') {
        var link = options[INDEX][1].match(link_pattern)
        str += ` <a href=\'${link}\'>${link}</a>`;
      }
      else {
        str += options[INDEX][0];
      }
      str += "          <\/div>";
      str += "        <\/div>";
    }

    $(".chat-logs").append(str);
    $(".tag").click(function () {
      $(this).toggleClass('selected', '')
      message($(this).text())
    })
    $("#cm-msg-" + INDEX).hide().fadeIn(300);
    console.log(answers)




  }
  function generate_message(msg, type) {
    INDEX++;
    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"default_avatar.png\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX).hide().fadeIn(300);
    if (type == 'self') {
      $("#chat-input").val('');
    }
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
  }
  async function  sendValue(answers){
    const res = await fetch('http://localhost:3000/api/answers',method='POST')
    console.log(res.json());
  }
  function generate_button_message(msg, buttons) {
    INDEX++;
    var btn_obj = buttons.map(function (button) {
      return "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\"" + button.value + "\">" + button.name + "<\/a><\/li>";
    }).join('');
    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg user\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "          <div class=\"cm-msg-button\">";
    str += "            <ul>";
    str += btn_obj;
    str += "            <\/ul>";
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX).hide().fadeIn(300);
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    $("#chat-input").attr("disabled", true);
  }

  $(document).delegate(".chat-btn", "click", function () {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  })

  $("#chat-circle").click(function () {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })

  $(".chat-box-toggle").click(function () {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })

})
