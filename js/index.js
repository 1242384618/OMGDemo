//ajax请求json数据

$(document).ready(function () {
    var responseObj;
    var currentIndex = 0;
    var num = 1;
    var questionLength = 0;
    //当用户选了一个答案
    var currentQuestion;
    var currentAnswer = 0;
    var anserObj = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E",
        6: "F",
        7: "G"
    };
    var obj = {};

    $.ajax({
        url: "https://cheyouquan.kakamobi.com/api/h5/activity/act-test-answer/detail.htm?identity=testYourCar&name=一分钟测试你开什么车",
        type: "GET",
        dateType: "json",
        success: (function (data) {
            guessScroll(data);
        }),
        error: function (err) {
            alert("请求失败");
        }
    });


    //Jquery处理json数据
    function guessScroll(jsonData) {
        responseObj = jsonData;
        currentIndex = 0;
        //当用户选了一个答案
        currentQuestion = responseObj.data.questions[currentIndex];
        questionLength = responseObj.data.questions.length;
        currentAnswer = 0;

        $(".several-into .several").html((currentIndex + 1));
        $(".header-title").html((currentQuestion.title));

        var options = currentQuestion.options;
        var html = '';
        $.each(options, function (index, item) {
            var title = item.title,
                optionId = item.optionId,
                sortNo = item.sortNo;
            html += '<div class="opsize">\n' +
                '                                <div class="oplast" data-optionid="'+optionId+'" ref="show" data-index="0">\n' +
                '                                    <div class="choose"><img class="select" src="images/unselected.png" alt="1">\n' +
                '                                    </div>\n' +
                '                                </div>' + anserObj[sortNo] + '.' + title + '\n' +
                '                            </div>'

        })
        $(".option").html(html);

        $(".opsize .oplast").click(function () {
            console.log("我被点击了");
            currentAnswer = $(this).attr("data-optionid");
            obj[currentQuestion.questionId] = currentAnswer;
            console.log("选择了答案" + JSON.stringify(obj));

        });

        $(".choose .select").click(function () {
            if(this === this)
            $(this).attr("src", "images/selected.png");

        });

    }



    $(".next").click(function (e) {
        var e = e || window.event
       if(e.type = 'click'){
           $(".progress img").attr("src","images/progress3.png");
       }
        $(".progress img").attr("src","images/progress2.png");
        $(".progress img").attr("src","images/progress3.png");
        $(".progress img").attr("src","images/progress4.png");
        $(".progress img").attr("src","images/progress5.png");
        $(".progress img").attr("src","images/progress6.png");
        currentIndex = currentIndex + 1;
        if (currentIndex + 1 == questionLength) {
            //下一题按钮应该换成提交按钮了。逻辑上应该是提交数据
            $(this).css("background-image", "url(images/cbaeeba167b1c1333643146aa7f92440.png)");
        }
        if (currentIndex == questionLength) {
            var submitDate = {
                "answers": obj
            };
            //下一题按钮应该换成提交按钮了。逻辑上应该是提交数据
            console.log("提交的答案" + JSON.stringify(submitDate));
            $.ajax({
                url: "https://cheyouquan.kakamobi.com/api/h5/activity/act-test-answer/submit.htm",
                data: {
                    identity: "testYourCar",
                    nickName: "zhang",
                    inApp: "false",
                    submitData: JSON.stringify(submitDate)
                },
                type: "POST",
                dateType: "json",
                success: (function (date) {
                    //显示结果
                    console.log("返回的数据" + JSON.stringify(date));
                }),
                error: (function (err) {
                    alert("请求失败");
                })
            })
        }
        currentQuestion = responseObj.data.questions[currentIndex];

        $(".several-into .several").html((currentIndex + 1));
        $(".header-title").html((currentQuestion.title));
        var options = currentQuestion.options;
        var html = '';
        var val = '';
        $.each(options, function (index, item) {
            var title = item.title,
                optionId = item.optionId,
                sortNo = item.sortNo;
            html += '<div class="opsize">\n' +
                '                                <div class="oplast" data-optionid="' + optionId + '" ref="show" data-index="0">\n' +
                '                                    <div class="choose"><img class="select" src="images/unselected.png" alt="1">\n' +
                '                                    </div>\n' +
                '                                </div>' + anserObj[sortNo] + '.' + title + '\n' +
                '                            </div>'


        })
        $(".option").html(html);

        $(".opsize .oplast").unbind()

        $(".opsize .oplast").click(function () {
            currentAnswer = $(this).attr("data-optionid");
            obj[currentQuestion.questionId] = currentAnswer;
            console.log("选择了答案" + JSON.stringify(obj));
        });
    });


})

