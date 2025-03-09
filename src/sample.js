var userId = "";
var authlink = "";
var toastTimer = $('#toastTimer').val();
var userLocationDenied = false;
var mediaAccess = false;
var utag_data = new Object();
var analyticPageName = "";
const state = {
    validContactNum: false,
};

$(function () {

    /***** Resume Lead Journey ******/
    resumeLeadJourney();

    $(document).on("click", "#copytextImage", function (e) {
        var copyText = $('#copiedText').text();
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText);
    });


    /*permission click on third step of skyc*/
    $(document).on("change", ".checkbox-input", function (e) {
        if (!$("#locationCheckbox").prop('checked') && e.target.id == 'locationCheckbox') {
            showToast();
        }
        if ($("#phNumberCheckbox").prop('checked')) {
            $('#backProceedBtn').addClass('activeBtn');
            validatePremissionBtn();
        } else {
            $('#premissionBtn').removeClass('activeBtn');
            $('#backProceedBtn').removeClass('activeBtn');
        }

        /*Analytics code starts here for checkboxes */
        if ($(this).attr('id') == 'phNumberCheckbox') {
            if ($("#phNumberCheckbox").prop('checked')) { 			//Checked

                clickEventAdobeDataLayer({
                    'Block_SIM_Request': analyticPageName + ": KYC: Verify Alternate Number Check"
                }, "BlockSIMRequestID");

            } else {											 //unChecked

                clickEventAdobeDataLayer({
                    'Custom_Links': analyticPageName + ": KYC: Verify Alternate Number UnCheck"
                }, "LinkClick");
            }
        } else if ($(this).attr('id') == 'locationCheckbox') {
            if ($("#locationCheckbox").prop('checked')) {		//Checked

                clickEventAdobeDataLayer({
                    'dynamic_content': analyticPageName + ": KYC: Acess Current Location Check"
                }, "DynamicContent");
            } else {										 //unChecked

                clickEventAdobeDataLayer({
                    'Custom_Links': analyticPageName + ": KYC: Acess Current Location UnCheck"
                }, "LinkClick");
            }
        } else if ($(this).attr('id') == 'aadhaarCheckbox') {
            if ($("#aadhaarCheckbox").prop('checked')) {		//Checked

                clickEventAdobeDataLayer({
                    'Custom_Links': analyticPageName + ": KYC: Aadhar Authentication Check"
                }, "LinkClick");
            } else {									//unChecked

                clickEventAdobeDataLayer({
                    'Custom_Links': analyticPageName + ": KYC: Aadhar Authentication UnCheck"
                }, "LinkClick");
            }
        }
    });


    // When the user clicks enter anaother number cta in modal
    $("#enterAnotherNumber, #serviceBlockClose").on("click", function () {
        $("#serviceBlockedModal").addClass('d-n');
        $('body').removeClass('alert-o-m');
        $("#contactNumber").val("").focus().removeClass("left-space");
        $(".country-code").addClass("d-n");
        var title = $(this).text();
        if (title == "enter another number") {

            clickEventAdobeDataLayer({
                'Custom_Links': "NEO SKYC Connection: SKYC Blocked on Your Number " + title
            }, "LinkClick");
        } else {

            clickEventAdobeDataLayer({
                'Custom_Links': "NEO SKYC Connection: SKYC service is Close"
            }, "LinkClick");
        }
    });

});

// When the user clicks close the modal
$(document).on("click", "#closeBtnMob", function () {
    $(".desktopTo-mobile-m").addClass('d-n')
    $('body').removeClass('m-o-body');
});

$(document).on("click", "#closeBtnD", "#closeBtnMob", function () {
    $(".desktopTo-mobile-m").addClass('d-n')
    $('body').removeClass('m-o-body');

    clickEventAdobeDataLayer({
        'dynamic_content': "NEO SKYC Connection: self KYC benefits! Close"//prop58
    }, "DynamicContent");
});

$(document).on("click", "#locationModalClose", function () {
    $("#locationAccessModal").addClass('d-n')

    clickEventAdobeDataLayer({
        'dynamic_content': "NEO SKYC Connection: Location Access close"//prop58
    }, "DynamicContent");
    if (!$('body').is('[class*="modal-"]')) {
        $('body').removeClass('m-o-body');
    }
});

$(document).on("click", "#locationAccessModal .reload-page", function () {
    var title = $(this).text();

    clickEventAdobeDataLayer({
        'Custom_Links': analyticPageName + ": SKYC We need Your Consent: " + title
    }, "LinkClick");
    location.reload();
});


$(".user-details-container .form-container .card").click(function () {
    if ($(this).find(".card-header").hasClass("opened-card")) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(this).offset().top
        }, 500);
    }
});

$('.close-modal').on('click', function () {
    $(this).parents('.modal-wrapper').addClass('d-n');
});

function isNotEmpty(str) {
    return str != "" && str != null && str != "null" && str != undefined && str != "undefined";
}

function isMobileDevice() {
    var isMobile = false;
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    return isMobile;
}

function checkIfEmpty(value) {
    return value != "" && value != undefined && value != null;
}

function getUrlVars(key, input) {
    var vars = {};
    var parts = input.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars[key];
}

function insertUserDetails() {
    var object = {};
    var requestParamsJson = {};
    var contactNum = $('#contactNumber');
    requestParamsJson["mobNumber"] = $('#contactNumber').val();
    var encVals = encryptVars(JSON.stringify(requestParamsJson));
    object['params'] = encVals.encryptedNumber.toString();
    object['sl'] = encVals.salt.toString();
    object['algf'] = encVals.iv.toString();
    object['sps'] = encVals.secretPassPhrase.toString();

    $.ajax({
        url: "/bin/skyc/rvnumbervalidation",
        type: 'POST',
        async: true,
        data: 'mobile=' + JSON.stringify(object),
        beforeSend: function () {

        },
        success: function (result) {
            let servletResponse = result;
            let attrVal = '';
            let responseJson = JSON.parse(servletResponse);
            let validContactNum = false;
            if (responseJson.STATUS == 'SUCCESS') {
                state.validContactNum = true;

            } else if (responseJson.STATUS == 'FAILURE') {

                if (responseJson.error == 'Inactive number') {
                    attrVal = contactNum.siblings('.infoText-wrapper').find('.info-text').attr('data-inActive-error');
                }
                if (responseJson.error == 'NOT_FOUND') {
                    attrVal = contactNum.siblings('.infoText-wrapper').find('.info-text').attr('data-nonVI-error');
                }
                contactNum.siblings('.infoText-wrapper').find('.info-text').removeClass('d-n');
                inputErrorCases(contactNum, attrVal);
                state.validContactNum = false;
            }
            validatePremissionBtn();
        },
        error: function (xhr) {
            console.log("verify your vi number error");
        },
        complete: function () {

        }
    });
}

function handleSpecialChars(encryptedNumber) {
    return encryptedNumber.replace(/[+]/g, "%2B");
}

var encryptVars = function (mobNumber) {
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var iv = CryptoJS.lib.WordArray.random(128 / 8);
    var secretPassPhrase = CryptoJS.lib.WordArray.random(128 / 8);
    var key128Bits = CryptoJS.PBKDF2(secretPassPhrase.toString(), salt, {
        keySize: 128 / 32
    });
    var key128Bits100Iterations = CryptoJS.PBKDF2(secretPassPhrase.toString(),
        salt, {
        keySize: 128 / 32,
        iterations: 100
    });
    var encryptedNumber = CryptoJS.AES.encrypt(mobNumber,
        key128Bits100Iterations, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return {
        salt: salt,
        iv: iv,
        secretPassPhrase: secretPassPhrase,
        encryptedNumber: handleSpecialChars(encryptedNumber.toString())
    };
}

function getUrlVars(key, input) {
    var vars = {};
    var parts = input.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars[key];
}

function showToast() {
    $('.snackbar').removeClass('d-n');
    setTimeout(function () {
        $('#snackBar').addClass('d-n');
    }, toastTimer);
}

function checkIfEmpty(value) {
    return value != "" && value != undefined && value != null;
}

function sendSmsToUser() {
    var object = {};
    var requestParamsJson = {};
    requestParamsJson["alternateNumber"] = $("#contactNumber").val();
    //requestParamsJson["mobnumberlist"] = mobnumberliststring;

    var encVals = encryptVars(JSON.stringify(requestParamsJson));
    object['params'] = encVals.encryptedNumber.toString();
    object['sl'] = encVals.salt.toString();
    object['algf'] = encVals.iv.toString();
    object['sps'] = encVals.secretPassPhrase.toString();
    $.ajax({
        url: "/bin/skyc/skycwcssendsms",
        type: 'POST',
        async: true,
        data: { "smsdetails": JSON.stringify(object) },
        beforeSend: function () {
            $('body').trigger("showLoader");
        },
        success: function (result) {
            var responseJson = JSON.parse(result);
            var Status = responseJson.Status;
            if (Status == 'Success') {
                $("#desktopToMobileModal .modal-info").text('We’ve sent you an SMS with this link on your number');
                $(".desktopTo-mobile-m").removeClass('d-n');
                $('body').addClass('m-o-body');
            } else {
                $("#desktopToMobileModal .modal-info").text('We will send you an SMS with this link on your number');
                $(".desktopTo-mobile-m").removeClass('d-n');
                $('body').addClass('m-o-body');
            }
        },
        error: function (xhr) {
            console.log("error case");
        },
        complete: function () {
            console.log("complete case");
        }
    });
}

function autoReadOtpAPI(input, submitBtn) {
    // used AbortController with setTimeout so that WebOTP API (Autoread sms) will get disabled after 1min
    const signal = new AbortController();
    setTimeout(() => {
        signal.abort();
    }, 1 * 60 * 1000);
}
