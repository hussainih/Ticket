


$('#SuperVisorSpecializations').jstree({
    "core": {
        "themes": {
            "variant": "large"
        },
        "multiple": true,

        'data': {
            type: "GET",
            url: "GetSuperVisorSpecializationData",
            contentType: "application/json; charset=utf-8",
            data: {
                UserRecID: $('#Supervisor_Id').val()
            },
            success: function (data) {
                data.d;
                $(data).each(function () {
                    return { "id": this.id };
                });
            }

        }
        

    },
    "checkbox": {
        "keep_selected_style": false
    },
    "plugins": ["wholerow", "checkbox"]

});


$('#SubmitSupervisorSpecialization').on('click', function () {

    console.log("This accessed");
    var instance = $('#SuperVisorSpecializations').jstree(false);
    var allValues = instance.get_selected();
    var selectedValues = [];

    //jsTree selects all the records, the loop filters and selects only Specializations
    for (var i = 0, j = allValues.length; i < j; i++) {
        if (instance.get_node(allValues[i]).parents.length === 4) {
            selectedValues.push(allValues[i]);
        }
    }


    console.log(selectedValues);

    $.ajax({
        type: "POST",
        url: "PostSuperVisorSpecializationData",
        data: {
            SuperVisorRecID: $('#Supervisor_Id').val(),
            Specializations: selectedValues
        },
        success: function (data) {
            $("#UserInfo").html(data);
            setTimeout(function () {
                $('#UserInfoMessage').remove();
            }, 2000)

        },
        error: function (xhr, ajaxOptions, throwError) {
            alert(xhr.state);
            alert(throwError);
        }
    });

});