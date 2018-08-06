$(document).ready(function () {
    //The HTML editor framework summernote will be applied on 
    $('#ProposalContent').summernote({
        placeholder: 'Please look into sample proposals in order to write a better proposal',
        tabsize: 2,
        height: 400,
        
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font'],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    });
    //Apply chosen plugin on Specialization div
    //$('.SpecializationList').chosen();

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
   
});

$('#ProposalType_Value').val($(this).find('option:selected').text())
// on proposal type change, hide or show second supervisor
$('#ProposalType').on('change', function () {
    $('#ProposalType_Value').val($(this).find('option:selected').text()); //File in the hidden value so it could be sent back
    console.log("Proposal Type Click");
    var SelectedValue = $(this).find('option:selected').text()
    IsProposalForThesisOrProject(SelectedValue);

});

function IsProposalForThesisOrProject(SelectedValue) {

    if (SelectedValue == 'Thesis') {
        $('#SecondSupervisor').show();
        
        $('#ProposalSecondSupervisor').val();
        $('#ProposalSecondSupervisor').append($("<option />").val("ExternalSupervisor").text("Supervisor is not from university"));
    }

    if (SelectedValue == 'Project') {

        $('#SecondSupervisor').hide();
        $('#ExternalSupervisor_FirstName').val("NotRequired");
        $('#ExternalSupervisor_LastName').val("NotRequired");
        $('#ExternalSupervisor_Email').val("NoteRequired@NotRequired.com");
        $('#ExternalSupervisor_Company').val("NotRequired");

        $('#ProposalSecondSupervisor').prepend($("<option />").val("NotRequired").text("NotRequired"));
        $('#ProposalSecondSupervisor').val("NotRequired");
        
    }

    if ($('#ExternalSupervisDiv').find('option:selected').val() == "ExternalSupervisor") {
        $('#ExternalSupervisDiv').show();
        $('#ExternalSupervisor_FirstName').val("");
        $('#ExternalSupervisor_LastName').val("");
        $('#ExternalSupervisor_Email').val("");
        $('#ExternalSupervisor_Company').val("");
        $("#ProposalSecondSupervisor option[value='NotRequired']").remove();

    } else {
        if (!(SelectedValue == 'Thesis')) {
            $('#ExternalSupervisor_FirstName').val("NotRequired");
            $('#ExternalSupervisor_LastName').val("NotRequired");
            $('#ExternalSupervisor_Email').val("NoteRequired@NotRequired.com");
            $('#ExternalSupervisor_Company').val("NotRequired");

            $('#ProposalSecondSupervisor').prepend($("<option />").val("NotRequired").text("NotRequired"));
            $('#ProposalSecondSupervisor').val("NotRequired");
        }
    }
   
}

function IsProposalForThesisOrProject2(SelectedValue) {

    if (SelectedValue == 'Thesis') {
        $('#SecondSupervisor').show();

        $('#ProposalSecondSupervisor').val();
        $('#ProposalSecondSupervisor').append($("<option />").val("ExternalSupervisor").text("Supervisor is not from university"));
    }

    if (SelectedValue == 'Project') {

        $('#SecondSupervisor').hide();
        $('#ExternalSupervisor_FirstName').val("NotRequired");
        $('#ExternalSupervisor_LastName').val("NotRequired");
        $('#ExternalSupervisor_Email').val("NoteRequired@NotRequired.com");
        $('#ExternalSupervisor_Company').val("NotRequired");

        $('#ProposalSecondSupervisor').prepend($("<option />").val("NotRequired").text("NotRequired"));
        $('#ProposalSecondSupervisor').val("NotRequired");

    }

    if ($('#ExternalSupervisDiv').find('option:selected').val() == "ExternalSupervisor") {
        $('#ExternalSupervisDiv').show();
        $('#ExternalSupervisor_FirstName').val("");
        $('#ExternalSupervisor_LastName').val("");
        $('#ExternalSupervisor_Email').val("");
        $('#ExternalSupervisor_Company').val("");
        $("#ProposalSecondSupervisor option[value='NotRequired']").remove();

    } else {
        if (!(SelectedValue == 'Thesis')) {
            $('#ExternalSupervisor_FirstName').val("NotRequired");
            $('#ExternalSupervisor_LastName').val("NotRequired");
            $('#ExternalSupervisor_Email').val("NoteRequired@NotRequired.com");
            $('#ExternalSupervisor_Company').val("NotRequired");

        }
    }

}
//In /Student/CreateNewTicket when degree type "Master,
//"Bachelor" is slected the preceedign drop down list should be filled with DegreePrograms
$("#ProposalDegreeType").on('change', function () {

    console.log($(this).find('option:selected').text())
    console.log($(this).find('option:selected').val())
    $.ajax({
        type: "GET",
        url: "GetDegreePrograms",
        data: {
            Key: $(this).find('option:selected').val(),
            Value: $(this).find('option:selected').text()
        },

        success: function (result) {
            console.log(result);
            //push the result data in DegreePrograms Drop Down.
            $('#DegreeProgramsList').empty();
            $('#DegreeProgramsList').append($("<option />").text("Select an Option"));
            $.each(result, function () {

                $('#DegreeProgramsList').append($("<option />").val(this.Key).text(this.Value));

            });

        }
    });


});
// Fill the specialisations SelectBox when a degree program is selected
$("#DegreeProgramsList").on('change', function () {
    
   

    $.ajax({
        type: "GET",
        url: "GetSpcializations",
        data: {
            Key: $(this).find('option:selected').val(),
            Value: $(this).find('option:selected').text()
        },

        success: function (result) {
            console.log(result);
            //push the result data in DegreePrograms Drop Down.
            $('#ProposalSpecializationList').empty();
            $('#ProposalSpecializationList').append($("<option />").text("Select an Option"));
            $.each(result, function () {
                console.log("you are here");

                $('#ProposalSpecializationList').append($("<option />").val(this.Key).text(this.Value));

                //$('#ProposalSpecializationList').trigger('chosen:updated');
            });

        }
    });


});

//$("#SubmitProposal").click(function () {
//    $(this).submit();
//});

$('#IsSystemSuggested').on('change', function () {
    console.log("Hi");
    if ($(this).is(':checked')) {
        console.log("Checekd");
    } else {
        console.log("Unchecked");
    }

});


//Update list of First and Second Supervisors when specialisations is selected
$('#ProposalSpecializationList').on('change', function (evt, params) {
    var SelectedValue = $('#ShowAllSupervisors').find('option:selected').text();
    IsProposalForThesisOrProject($('#ProposalType').find('option:selected').text());
    console.log("Really " + SelectedValue);
    if (SelectedValue == 'All Professors') {
       
        GetAllSupervisors(evt, params);
    } else {
        GetSuggestedSupervisors(evt, params);
       
    }

});

function GetSuggestedSupervisors(evt, params) {
    var key;
    var value;
    for (var item in params) {
        key = item;
        value = params[item]
    }

    var _Specialization = $('#ProposalSpecializationList').val();
    console.log(_Specialization);
    $.ajax({
        type: "GET",
        url: "GetSuggestedSupervisors",
        data: {
            Specialization: _Specialization
        },

        success: function (result) {
            console.log(result);
            //push the result data in DegreePrograms Drop Down.
            $('#ProposalFirstSupervisor').empty();
            $('#ProposalFirstSupervisor').append($("<option />").text("Select an Option"));
            $('#ProposalSecondSupervisor').empty();
            $('#ProposalSecondSupervisor').append($("<option />").text("Select an Option"));
            $.each(result, function () {
                $('#ProposalFirstSupervisor').append($("<option />").val(this.Key).text(this.Value));
                $('#ProposalSecondSupervisor').append($("<option />").val(this.Key).text(this.Value));
            });
            IsProposalForThesisOrProject($('#ProposalType').find('option:selected').text());
        }
    });
}

//Get list of All supervisors if All is selected, else get System Suggested Supervisors System Suggested is selected
$('#ShowAllSupervisors').on('change', function (evt, params) {
    
    if ($(this).val() == "All") {

        console.log('Key is All');
        GetAllSupervisors(evt, params);
       
    }
    else
    {
        console.log("Key is: " +key);
        console.log('Key is not All');
        GetSuggestedSupervisors(evt, params);
    }
});

$('#ProposalSecondSupervisor').on('change', function () {
    var SelectedValue = $(this).find('option:selected').val();
    alert(SelectedValue);
    if (SelectedValue == 'ExternalSupervisor') {
        $('#ExternalSupervisDiv').show();
        $('#ExternalSupervisDiv').show();
        $('#ExternalSupervisor_FirstName').val("");
        $('#ExternalSupervisor_LastName').val("");
        $('#ExternalSupervisor_Email').val("");
        $('#ExternalSupervisor_Company').val("");
    }
    else {
        $('#ExternalSupervisDiv').hide();
        var SelectedValue = $(this).find('option:selected').text()
        IsProposalForThesisOrProject2(SelectedValue);
    }
});

function GetAllSupervisors(evt, params) {
     $.ajax({
            type: "GET",
            url: "GetAllSupervisors",
            success: function (result) {
                console.log("ALL SuperVisors" +result);
                //push the result data in DegreePrograms Drop Down.
                $('#ProposalFirstSupervisor').empty();
                $('#ProposalFirstSupervisor').append($("<option />").text("Select an Option"));
                $('#ProposalSecondSupervisor').empty();
                $('#ProposalSecondSupervisor').append($("<option />").text("Select an Option"));
                $.each(result, function () {
                    $('#ProposalFirstSupervisor').append($("<option />").val(this.Key).text(this.Value));
                    $('#ProposalSecondSupervisor').append($("<option />").val(this.Key).text(this.Value));
                });
            }
        });

}