var role =
    $("#txtRole").on('focusout', function () {
        role = $(this).val();
    });
$(document).ready(function () {

    //$('.ticketingmenu').find("a").filter(function () {
    //    return this.href.replace(/\/+$/, '') === window.location.href.replace(/\/+$/, '');
    //}).addClass('TicketActive');
    //Apply Chosen on User's Detail page
    $('#ChosenUserRoles').chosen({ width: "80%" });

    //Apply chosen on DomainRoles in DomainRole Page
    $('.ChosenDomainRoles').chosen({ width: "70%" });


    $('.chosen-select-deselect').chosen({ allow_single_deselect: true });

    $("[name='my-checkbox']").bootstrapSwitch();

    $("#btnSubmitRole").focusin(function () {
        $(this).siblings("[data-valmsg-summary]").hide()
    });


    //$("#DomainRolesCheckBox").each()
    $('#btnSaveDomainRole').on('click', function () {
        $(this).html("New");
        alert("Handler for .click() called.");
        console.log("I am clicked");
    });

});

//In DomainRole page when a role is selected or deselected the data is posted to Server
$('#AllowedDomainList').on('change', '.ChosenDomainRoles', function (evt, params) {
    var key;
    var value;
    for (var item in params) {
        key = item;
        value = params[item]
    }
    $.ajax({
        type: "POST",
        url: "PostDomainRoles",
        data: {
            DomainName: $(this).attr("name"),
            RoleName: value,
            option: key
        },
        success: function (result) {

            $("#UserInfo").html(result);
            setTimeout(function () {
                $('#UserInfoMessage').remove();
            }, 2000)
        }

    });
});

//In User's Details page when a role is selected or deselected the data is posted to Server
$("#ChosenUserRoles").on('change', function (evt, params) {
    var key;
    var value;
    for (var item in params) {
        key = item;
        value = params[item]
    }
    console.log(key);
    console.log(value);
    //console.log(evt.target);
    //console.log(evt.target.parentElement);
    console.log($(this).attr("name"));


    $.ajax({
        type: "POST",
        url: "../UpdateUserRole",
        data: {
            UserID: $('#UserID').val(),
            RoleName: value,
            option: key
        },
        success: function (result) {

            $("#UserInfo").html(result);
            setTimeout(function () {
                $('#UserInfoMessage').remove();
            }, 2000)
        }

    });



});


// When a new Role is Added in Role section in DomainRolePage the data should also bed update to The following section for chosen list
function appendToChosen(value) {
    $('#ChosenDomainRoles').append("<option value='" + value + "'>" + value + "</option>");
    $('#ChosenDomainRoles').trigger('chosen:updated');
}

$("[name='my-checkbox']").bootstrapSwitch();

//This function will fadeout the popups within 2 seconds
function FadeOutUserInfo() {

    setTimeout(function () {
        $('#UserInfoMessage').remove();
    }, 2000)
}


// When a new Role for example "Admin" or "Student" is added this method is triggered after success on AJAX
function RoleOnSuccess() {
    $('#txtRole').val('');
    $("#RoleValidationSummary ul ").html('');
    //The new added role to the server should also be added in chosen list so the user could select the default Role/Roles for a domain
    appendToChosen(role);

}


//Allowed Domain is Called when the a new Domain is for example gmail.com is post to the server
function AllowedDomainOnSuccess() {
    $("#txtDomainName").val('');
    $("#AllowedDomainValidationSummary ul ").html('');
    $('.ChosenDomainRoles').chosen({ width: "70%" });
    

}



function SubmitDomainRole() {
    var Roles = [];
    var DomainName = $("#HiddenDomainName").val();

    $("input.custom-control-input:checked").each(function () {
        Roles.push($(this).val());
    });

    $.ajax({
        type: "POST",
        url: "PostDomainRoles",
        data: {
            DomainName: DomainName,
            DomainRoles: Roles
        },
        success: function (result) {
            $("#FadeOutUserInfo").html(result);
        }
    });


    $('#modal-container').modal('hide');



}


///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////////////////// Student Controller ////////////////////////////
/////////////////////////////////////////////////////////////////////

