function MakeMenuActive(source) {

    $('.ticketingmenu').find("a").removeClass('TicketActive');

    $('.' + source).addClass('TicketActive');
   
       $('.ticketingmenu').find("a").filter(function () {
           return this.href.replace(/\/+$/, '') === window.location.href.replace(/\/+$/, '');
       }).removeClass('TicketActive');
    
}
$(document).ready(function () {
    $('#TicketStatusHistory').popover();
   
});

$(document).on('click', '#UpdateProposalContentBTN', function () {
    $('#ProposalContentID').modal('toggle');
    $.ajax({
        type: "POST",
        url: "../UpdateProposalContent",
        data: {
            ProposalId: $(this).find('#RecId').val(),
            'ProposalContent.Content': $(this).find('#ProposalContent_Content').val(),
        },

        success: function (result) {
            
            $('#ProposalContentList').insertAfter(result);
            $('#ProposalContentID').modal('toggle');
           

        }
    });
});
function ApplySummerNote() {
    $('#ProposalContentEdit').summernote({
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
}